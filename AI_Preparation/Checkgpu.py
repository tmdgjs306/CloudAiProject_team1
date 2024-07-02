import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '0'  # 모든 로그를 출력
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'  # oneDNN 옵션 비활성화

import tensorflow as tf

# TensorFlow 버전 출력
print("TensorFlow Version: ", tf.__version__)

# GPU 장치 목록 출력
gpus = tf.config.experimental.list_physical_devices('GPU')
if gpus:
    print(f"Num GPUs Available: {len(gpus)}")
    for gpu in gpus:
        print(f"GPU: {gpu}")
        try:
            tf.config.experimental.set_memory_growth(gpu, True)
        except RuntimeError as e:
            print(e)
else:
    print("No GPUs Available")
