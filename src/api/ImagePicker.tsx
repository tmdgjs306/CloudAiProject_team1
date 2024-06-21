import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { request, PERMISSIONS } from 'react-native-permissions';
import { Platform } from 'react-native';

const requestCameraPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'android') {
      const granted = await request(PERMISSIONS.ANDROID.CAMERA);
      return granted === 'granted';
    } else {
      const result = await request(PERMISSIONS.IOS.CAMERA);
      return result === 'granted';
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const camera = async (
  setPhoto: React.Dispatch<React.SetStateAction<string | null>>, 
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
  const hasPermission = await requestCameraPermission();
  if (!hasPermission) {
    console.log("카메라 권한이 거부되었습니다");
    return;
  }

  try {
    console.log("카메라를 실행합니다");
    const result = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
    });

    if (result.didCancel || !result.assets || result.assets.length === 0) {
      return;
    }

    const localUri = result.assets[0].uri;
    const uriPath = localUri?.split("//").pop();
    setPhoto(uriPath ? "file://" + uriPath : null);
    setIsVisible(false);
  } catch (error) {
    console.error("카메라 실행 중 오류 발생: ", error);
  }
};

export const imageLibrary = async (
  setPhoto: React.Dispatch<React.SetStateAction<string | null>>, 
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
  try {
    console.log("사진 라이브러리를 실행합니다");
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });

    if (result.didCancel || !result.assets || result.assets.length === 0) {
      return;
    }

    const localUri = result.assets[0].uri;
    const uriPath = localUri?.split("//").pop();
    setPhoto(uriPath ? "file://" + uriPath : null);
    setIsVisible(false);
  } catch (error) {
    console.error("사진 라이브러리 실행 중 오류 발생: ", error);
  }
};
