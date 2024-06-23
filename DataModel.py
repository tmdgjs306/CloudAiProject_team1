import os
import torch
import torch.nn as nn
import torch.optim as optim
import torchvision.transforms as transforms
from torchvision.datasets import ImageFolder
from torch.utils.data import DataLoader
from torchvision import models
from torchvision.models import ResNet18_Weights

# CUDA 설정
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

# 클래스 레이블 로드
with open('breed.txt', 'r') as f:
    classes = [line.strip() for line in f.readlines()]

# 데이터 변환 정의 (데이터 증강 포함)
train_transform = transforms.Compose([
    transforms.RandomResizedCrop(224),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(15),  # 회전 각도 증가
    transforms.RandomVerticalFlip(),
    transforms.ColorJitter(brightness=0.4, contrast=0.4, saturation=0.4, hue=0.2),  # 색상 변화 범위 조정
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

# 검증 데이터 증강 (가벼운 증강 적용)
test_transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.RandomHorizontalFlip(),  # 수평 뒤집기 추가
    transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2, hue=0.1),  # 가벼운 색상 변화
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

# 사용자 정의 데이터셋 로드
trainset = ImageFolder(root='./dataset/train', transform=train_transform)
trainloader = DataLoader(trainset, batch_size=32, shuffle=True, num_workers=4)

testset = ImageFolder(root='./dataset/test', transform=test_transform)
testloader = DataLoader(testset, batch_size=32, shuffle=False, num_workers=4)

print('Classes:', trainset.classes)  # 클래스 확인

# 사전 학습된 모델 불러오기
net = models.resnet18(weights=ResNet18_Weights.DEFAULT)

# 마지막 레이어 수정 (출력 노드 수를 클래스 수에 맞게 조정)
num_ftrs = net.fc.in_features
net.fc = nn.Sequential(
    nn.Dropout(0.5),  # Dropout 추가
    nn.Linear(num_ftrs, len(classes))
)

net = net.to(device)

# 손실 함수와 옵티마이저 정의
criterion = nn.CrossEntropyLoss()

# 초기 학습률을 낮추고 weight decay 추가
optimizer = optim.Adam(net.parameters(), lr=0.00005, weight_decay=0.01)  # 학습률 감소

# ReduceLROnPlateau 사용
scheduler = optim.lr_scheduler.ReduceLROnPlateau(optimizer, mode='min', factor=0.1, patience=5)

def evaluate_model(model, dataloader, criterion):
    model.eval()  # 검증 및 테스트 모드 설정 (Dropout 비활성화)
    correct = 0
    total = 0
    running_loss = 0.0
    with torch.no_grad():
        for data in dataloader:
            images, labels = data[0].to(device), data[1].to(device)
            outputs = model(images)
            loss = criterion(outputs, labels)
            running_loss += loss.item()
            _, predicted = torch.max(outputs.data, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()
    accuracy = 100 * correct / total
    avg_loss = running_loss / len(dataloader)
    return avg_loss, accuracy

if __name__ == "__main__":
    best_val_loss = float('inf')
    best_accuracy = 0.0
    num_epochs = 100  # 에포크 수를 20으로 설정
    early_stopping_patience = 20
    early_stopping_counter = 0

    for epoch in range(num_epochs):
        net.train()  # 훈련 모드 설정 (Dropout 활성화)
        running_loss = 0.0
        correct = 0
        total = 0
        for i, data in enumerate(trainloader, 0):
            inputs, labels = data[0].to(device), data[1].to(device)
            optimizer.zero_grad()
            outputs = net(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()
            running_loss += loss.item()
            _, predicted = torch.max(outputs.data, 1)
            total += labels.size(0)
            correct += (predicted == labels).sum().item()
            if i % 100 == 99:
                print('[%d, %5d] loss: %.3f' % (epoch + 1, i + 1, running_loss / 100))
                running_loss = 0.0
        
        # 학습 손실 및 정확도 계산
        train_loss = running_loss / len(trainloader)
        train_accuracy = 100 * correct / total

        # 검증 손실 및 정확도 계산
        val_loss, val_accuracy = evaluate_model(net, testloader, criterion)
        
        print('Epoch [{}/{}], Train Loss: {:.4f}, Train Accuracy: {:.2f}%, Val Loss: {:.4f}, Val Accuracy: {:.2f}%'
              .format(epoch + 1, num_epochs, train_loss, train_accuracy, val_loss, val_accuracy))

        # 스케줄러는 검증 손실을 기반으로 학습률을 조정
        scheduler.step(val_loss)

        # 최적의 검증 손실 저장 및 조기 종료 체크
        if val_loss < best_val_loss:
            best_val_loss = val_loss
            early_stopping_counter = 0
            torch.save(net.state_dict(), 'best13_100epochmodel.pth')  # 최적의 모델 저장
        else:
            early_stopping_counter += 1
            if early_stopping_counter >= early_stopping_patience:
                print('Early stopping at epoch:', epoch + 1)
                break

        best_accuracy = max(best_accuracy, val_accuracy)

    print('Finished Training')
    print('Best Validation Loss:', best_val_loss)

    # 최적의 모델 로드
    net.load_state_dict(torch.load('best13_100epochmodel.pth'))

    # 모델 저장
    PATH = './custom_resnet18_13breed_100epoc.pth'
    torch.save(net.state_dict(), PATH)

    print('Model saved to %s' % PATH)
