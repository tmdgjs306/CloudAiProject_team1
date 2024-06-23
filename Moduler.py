import subprocess
import os
import sys
#필요 모듈 설치
def install_requirements(requirements_file):
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", requirements_file])
        print("Modules installed successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error occurred: {e}")

# requirements.txt 파일 경로
requirements_file = 'ready.txt'

# requirements.txt 파일을 사용해 모듈 설치
install_requirements(requirements_file)