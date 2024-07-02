from PIL import Image
import os

def resize_images_in_directory(directory, size=(512, 512)):
    for filename in os.listdir(directory):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif')):
            img_path = os.path.join(directory, filename)
            with Image.open(img_path) as img:
                resized_img = img.resize(size, Image.Resampling.LANCZOS)
                resized_img.save(img_path)
                print(f"Resized and saved {filename}")

# 예시 사용법
image_directory = r'./'
resize_images_in_directory(image_directory)
