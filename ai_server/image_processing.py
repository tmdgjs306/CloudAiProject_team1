import os
from io import BytesIO
from PIL import Image, UnidentifiedImageError
import numpy as np
from keras.preprocessing import image
import tensorflow as tf
import torch
import cv2
import requests
from flask import abort
from dotenv import load_dotenv
load_dotenv()

def verify_image(image_url):
    if not image_url:
        error_message = "Image URL is required"
        print(error_message)
        abort(400, description=error_message)

    try:
        response = requests.get(image_url)
        if response.status_code != 200:
            error_message = "Failed to download image"
            print(error_message)
            abort(400, description=error_message)

        img = Image.open(BytesIO(response.content))
        if img.format not in ['JPEG', 'PNG']:
            error_message = "Unsupported image format"
            print(error_message)
            abort(400, description=error_message)
        return img

    except requests.exceptions.RequestException as e:
        error_message = f"Request failed: {e}"
        print(error_message)
        abort(400, description=error_message)
    except UnidentifiedImageError:
        error_message = "Invalid image content"
        print(error_message)
        abort(400, description=error_message)
    except Exception as e:
        error_message = f"Unexpected error: {e}"
        print(error_message)
        abort(500, description=error_message)

# 강아지 탐지용 욜로 모델
yolo_path = os.getenv('YOLO_PATH')
yolo_model = torch.hub.load('ultralytics/yolov5', 'custom', path=yolo_path, force_reload=True)

def crop_largest_dog_from_img(img):
    results = yolo_model(img)
    df = results.pandas().xyxy[0]
    dog_detections = df[df['name'] == 'dog']
    if dog_detections.empty:
        print('no dog detected')
        return img
    largest_area = 0
    largest_dog = None
    for index, row in dog_detections.iterrows():
        xmin, ymin, xmax, ymax = int(row['xmin']), int(row['ymin']), int(row['xmax']), int(row['ymax'])
        area = (xmax - xmin) * (ymax - ymin)
        if area > largest_area:
            largest_area = area
            largest_dog = (xmin, ymin, xmax, ymax)
    if largest_dog:
        xmin, ymin, xmax, ymax = largest_dog
        cropped_img = img.crop((xmin, ymin, xmax, ymax))
        return cropped_img
    else:
        return img
        

def preprocess_image(img):
    img = img.resize((224, 224))  # 이미지 로드 및 크기 조정
    img_array = image.img_to_array(img)  # 이미지를 numpy 배열로 변환
    img_array = np.expand_dims(img_array, axis=0)  # 배치 차원 추가
    img_array = img_array[:, :, :, :3]
    img_array = tf.keras.applications.vgg16.preprocess_input(img_array)  # 모델에 맞게 전처리
    return img_array