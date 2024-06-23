import numpy as np
import tensorflow as tf

# PyTorch 가중치 로드
pytorch_weights = np.load('pytorch_weights.npy', allow_pickle=True).item()

# Keras 모델 정의
def build_keras_resnet18(input_shape=(224, 224, 3), num_classes=120):
    inputs = tf.keras.Input(shape=input_shape)
    x = tf.keras.layers.Conv2D(64, (7, 7), strides=(2, 2), padding='same')(inputs)
    x = tf.keras.layers.BatchNormalization()(x)
    x = tf.keras.layers.Activation('relu')(x)
    x = tf.keras.layers.MaxPooling2D((3, 3), strides=(2, 2), padding='same')(x)

    def res_block(x, filters, strides=(1, 1)):
        shortcut = x
        x = tf.keras.layers.Conv2D(filters, (3, 3), padding='same', strides=strides)(x)
        x = tf.keras.layers.BatchNormalization()(x)
        x = tf.keras.layers.Activation('relu')(x)
        x = tf.keras.layers.Conv2D(filters, (3, 3), padding='same')(x)
        x = tf.keras.layers.BatchNormalization()(x)
        if strides != (1, 1):
            shortcut = tf.keras.layers.Conv2D(filters, (1, 1), strides=strides)(shortcut)
        x = tf.keras.layers.add([x, shortcut])
        x = tf.keras.layers.Activation('relu')(x)
        return x

    filters = [64, 128, 256, 512]
    for i, f in enumerate(filters):
        strides = (1, 1) if i == 0 else (2, 2)
        x = res_block(x, f, strides=strides)
        x = res_block(x, f)
        x = res_block(x, f)

    x = tf.keras.layers.GlobalAveragePooling2D()(x)
    outputs = tf.keras.layers.Dense(num_classes, activation='softmax')(x)

    model = tf.keras.Model(inputs, outputs)
    return model

keras_model = build_keras_resnet18()

# PyTorch 가중치를 Keras 모델로 복사
def set_keras_weights(keras_model, pytorch_weights):
    keras_model.layers[1].set_weights([pytorch_weights['conv1.weight'].transpose(2, 3, 1, 0), pytorch_weights['conv1.bias']])
    keras_model.layers[2].set_weights([pytorch_weights['bn1.weight'], pytorch_weights['bn1.bias'], pytorch_weights['bn1.running_mean'], pytorch_weights['bn1.running_var']])
    # 나머지 레이어도 동일하게 설정

# 가중치 복사
set_keras_weights(keras_model, pytorch_weights)

# Keras 모델 저장
keras_model.save('custom_resnet18.keras')

print("Keras 모델이 'custom_resnet18.keras' 파일로 저장되었습니다.")
