import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.layers import Dense, Dropout, GlobalAveragePooling2D
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint, ReduceLROnPlateau
import os

# CUDA 설정
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'  # TensorFlow 로깅 레벨 조정
os.environ['CUDA_VISIBLE_DEVICES'] = '0'  # 첫 번째 GPU 사용

# 클래스 레이블 로드
with open('breed.txt', 'r') as f:
    classes = [line.strip() for line in f.readlines()]

# 데이터 전처리 및 증강 설정
train_datagen = ImageDataGenerator(
    rescale=1./255,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    validation_split=0.2  # 데이터의 20%를 검증 데이터로 사용
)

test_datagen = ImageDataGenerator(rescale=1./255)

train_generator = train_datagen.flow_from_directory(
    './dataset/train',
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='training'
)

validation_generator = train_datagen.flow_from_directory(
    './dataset/train',
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='validation'
)

# tf.data.Dataset으로 변환
def generator_to_dataset(generator):
    output_signature = (
        tf.TensorSpec(shape=(None, 224, 224, 3), dtype=tf.float32),
        tf.TensorSpec(shape=(None, len(classes)), dtype=tf.float32)
    )

    def gen():
        for batch in generator:
            yield batch

    return tf.data.Dataset.from_generator(gen, output_signature=output_signature)

train_dataset = generator_to_dataset(train_generator).prefetch(tf.data.AUTOTUNE)
validation_dataset = generator_to_dataset(validation_generator).prefetch(tf.data.AUTOTUNE)

# 사전 학습된 ResNet50 모델 로드
base_model = tf.keras.applications.ResNet50(
    weights='imagenet',
    include_top=False,
    input_shape=(224, 224, 3)
)

# 새로운 출력 레이어 추가
x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dropout(0.5)(x)
predictions = Dense(len(classes), activation='softmax')(x)

# 모델 구성
model = Model(inputs=base_model.input, outputs=predictions)

# 모든 층을 학습 가능하도록 설정
for layer in base_model.layers:
    layer.trainable = True

# 모델 컴파일
model.compile(optimizer=Adam(learning_rate=0.0001),
              loss='categorical_crossentropy',
              metrics=['accuracy'])

# 콜백 설정
early_stopping = EarlyStopping(monitor='val_loss', patience=20, restore_best_weights=True)
model_checkpoint = ModelCheckpoint('best_model.keras', monitor='val_loss', save_best_only=True)
reduce_lr = ReduceLROnPlateau(monitor='val_loss', factor=0.1, patience=5)
train_steps = 5920 // 32  # = 185
validation_steps = 1472 // 32  # = 46

# 모델 학습
model.fit(
    train_dataset,
    epochs=100,
    validation_data=validation_dataset,
    steps_per_epoch=train_steps,
    validation_steps=validation_steps,
    callbacks=[early_stopping, model_checkpoint, reduce_lr]
)


# 모델 저장
model.save('custom_resnet18_13breed_100epoch2.keras')

# 최적의 모델 로드
best_model = tf.keras.models.load_model('best_model2.keras')

# 모델 평가
loss, accuracy = best_model.evaluate(validation_dataset)
print('Best Validation Loss:', loss)
print('Best Validation Accuracy:', accuracy)
