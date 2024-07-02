import cv2
import dlib
import imutils
from imutils import face_utils
import numpy as np
import os
import shutil
from multiprocessing import Pool, cpu_count, Manager
#이미지중에 강아지얼굴이 있는 이미지만 남기고 없는 이미지는 TRASH폴더로 전송                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            sssssssssssss
def _trim_css_to_bounds(css, image_shape):
    return max(css[0], 0), min(css[1], image_shape[1]), min(css[2], image_shape[0]), max(css[3], 0)

def _rect_to_css(rect):
    return rect.top(), rect.right(), rect.bottom(), rect.left()

def _raw_face_locations(img, number_of_times_to_upsample=1):
    return detector(img, number_of_times_to_upsample)

def face_locations(img, number_of_times_to_upsample=1):
    return [_trim_css_to_bounds(_rect_to_css(face.rect), img.shape) for face in _raw_face_locations(img, number_of_times_to_upsample)]

def find_dog_face(input_image, size=None, debug=False):
    image = input_image.copy()
    if size:
        image = imutils.resize(image, width=size)
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    dets = detector(gray_image, 1)
    if len(dets) == 0:
        return False, image  # 얼굴이 감지되지 않은 경우
    for (i, det) in enumerate(dets):
        shape = predictor(image, det.rect)
        shape = face_utils.shape_to_np(shape)
        (x, y, w, h) = face_utils.rect_to_bb(det.rect)
        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
        cv2.putText(image, "Face #{}".format(i + 1), (x - 10, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
        if debug:
            for (i, (x, y)) in enumerate(shape):
                cv2.circle(image, (x, y), int(image.shape[1]/250), (0, 0, 255), -1)
    return True, image

def process_image(args):
    image_path, counter, lock, trash_path = args
    try:
        image = cv2.imread(image_path)
        if image is not None:
            detected, _ = find_dog_face(image)
            if detected:
                with lock:
                    new_image_name = f"{counter.value}.jpg"
                    new_image_path = os.path.join(os.path.dirname(image_path), new_image_name)
                    os.rename(image_path, new_image_path)
                    print(f"Detected face in {new_image_path}")
                    counter.value += 1
            else:
                shutil.move(image_path, trash_path)
                print(f"Moved {image_path} to {trash_path}")
        else:
            print(f"Failed to read image {image_path}")
    except Exception as e:
        print(f"Error processing image {image_path}: {e}")

def initializer(det_path, pred_path, root_pth):
    global detector, predictor, trash_path
    detector = dlib.cnn_face_detection_model_v1(det_path)
    predictor = dlib.shape_predictor(pred_path)
    trash_path = os.path.join(root_pth, 'Trash')

if __name__ == '__main__':
    face_landmark_detector_path = './dogHeadDetector.dat'
    face_landmark_predictor_path = './landmarkDetector.dat'

    root_path = 'C:/Users/eiad3/Desktop/test1/Project'
    trash_path = os.path.join(root_path, 'Trash')

    if not os.path.exists(trash_path):
        os.makedirs(trash_path)

    # 무시할 폴더 목록
    ignore_folders = []

    # 이미지 경로 수집
    image_paths = []
    for folder_name in os.listdir(root_path):
        if folder_name in ignore_folders:
            continue
        folder_path = os.path.join(root_path, folder_name)
        if os.path.isdir(folder_path):
            for image_name in os.listdir(folder_path):
                image_path = os.path.join(folder_path, image_name)
                if os.path.isfile(image_path):  # 파일인지 확인
                    image_paths.append(image_path)

    # 멀티프로세싱 풀 설정 및 실행
    with Manager() as manager:
        counter = manager.Value('i', 1)
        lock = manager.Lock()
        pool = Pool(processes=cpu_count(), initializer=initializer, initargs=(face_landmark_detector_path, face_landmark_predictor_path, root_path))
        pool.map(process_image, [(image_path, counter, lock, trash_path) for image_path in image_paths])
        pool.close()
        pool.join()