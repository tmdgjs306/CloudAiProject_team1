# extract_pytorch_weights.py

import torch
import torch.nn as nn
from torchvision import models

# 사전 학습된 ResNet18 모델 불러오기
net = models.resnet18(pretrained=False)
net.fc = nn.Linear(net.fc.in_features, 120)  # 예: 120개의 클래스
net.load_state_dict(torch.load('custom_resnet18.pth'))
net.eval()

# 가중치 추출
weights = {name: param.detach().numpy() for name, param in net.named_parameters()}

# 가중치를 numpy 파일로 저장
import numpy as np
np.save('pytorch_weights.npy', weights)

print("PyTorch 가중치가 'pytorch_weights.npy' 파일로 저장되었습니다.")
