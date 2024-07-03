import torch
import torch.onnx
import onnx
from onnx2keras import onnx_to_keras
from tensorflow.keras.models import save_model
import torchvision.models as models
import numpy as np

# PyTorch 모델을 ONNX 형식으로 변환
def convert_to_onnx(model, input_size, file_name):
    dummy_input = torch.randn(1, 3, input_size, input_size, device='cuda' if torch.cuda.is_available() else 'cpu')
    torch.onnx.export(model, dummy_input, file_name, verbose=True)

# ONNX 모델의 노드 이름에서 '/' 문자를 제거
def clean_node_names(onnx_model):
    for node in onnx_model.graph.node:
        node.name = node.name.replace('/', '_')
        for i, input_name in enumerate(node.input):
            node.input[i] = input_name.replace('/', '_')
        for i, output_name in enumerate(node.output):
            node.output[i] = output_name.replace('/', '_')

    for input in onnx_model.graph.input:
        input.name = input.name.replace('/', '_')
    
    for output in onnx_model.graph.output:
        output.name = output.name.replace('/', '_')
    
    for value_info in onnx_model.graph.value_info:
        value_info.name = value_info.name.replace('/', '_')

    for initializer in onnx_model.graph.initializer:
        initializer.name = initializer.name.replace('/', '_')

# ONNX 모델을 Keras 형식으로 변환
def convert_to_keras(onnx_model_file):
    onnx_model = onnx.load(onnx_model_file)
    clean_node_names(onnx_model)
    
    # ONNX 모델의 입력 이름을 확인
    input_all = [node.name for node in onnx_model.graph.input]
    input_initializer = [node.name for node in onnx_model.graph.initializer]
    net_feed_input = list(set(input_all) - set(input_initializer))
    print('ONNX 모델 입력 이름:', net_feed_input)

    k_model = onnx_to_keras(onnx_model, net_feed_input)
    return k_model

if __name__ == "__main__":
    input_size = 224
    onnx_file = 'custom_resnet18.onnx'

    # 사전 학습된 모델 불러오기 및 마지막 레이어 수정
    net = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)
    num_ftrs = net.fc.in_features
    net.fc = torch.nn.Sequential(
        torch.nn.Dropout(0.5),
        torch.nn.Linear(num_ftrs, 13)  # 클래스 수에 맞게 조정
    )
    net = net.to(torch.device('cuda:0' if torch.cuda.is_available() else 'cpu'))

    # 최적의 PyTorch 모델 로드
    net.load_state_dict(torch.load('best13_100epochmodel.pth'))
    net.eval()

    # ONNX로 변환
    convert_to_onnx(net, input_size, onnx_file)

    # Keras로 변환
    keras_model = convert_to_keras(onnx_file)

    # Keras 모델을 .h5 형식으로 저장
    keras_model.save('custom_resnet18_13breed.h5')

    # Keras 모델을 .keras 형식으로 저장
    save_model(keras_model, 'custom_resnet18_13breed.keras')

    print('모델이 .h5와 .keras 형식으로 저장되었습니다.')
