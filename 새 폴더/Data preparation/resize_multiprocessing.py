from PIL import Image
import os
from multiprocessing import Pool

def resize_image(image_path, size=(512, 512)):
    try:
        with Image.open(image_path) as img:
            resized_img = img.resize(size, Image.Resampling.LANCZOS)
            resized_img.save(image_path)
            print(f"Resized and saved {os.path.basename(image_path)}")
    except Exception as e:
        print(f"Error processing {image_path}: {e}")

def resize_images_in_directory(directory, size=(512, 512)):
    image_paths = [
        os.path.join(directory, filename)
        for filename in os.listdir(directory)
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif'))
    ]

    with Pool() as pool:
        pool.starmap(resize_image, [(image_path, size) for image_path in image_paths])

# 예시 사용법
image_directory = r'./'
resize_images_in_directory(image_directory)
