import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ImageBackground, Platform } from 'react-native';
import { BottomSheet, Button, ListItem } from '@rneui/themed';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation, NavigationProp } from '@react-navigation/native'; // NavigationProp 추가
import { analyzePageLayout } from '../styleSheet/analyzePageLayout';
import { request, PERMISSIONS } from 'react-native-permissions';
{/*
  * Author: Han_Seung_Heon,
  * Function: 사용자가 찍은 사진, 저장소의 사진을 결과페이지에 보내는 페이지. 
  * Date: 2024.06.15
  * 
  * ※ 현재 AI 서버가 미구현 상태라 정상적으로 동작하지 않음 (결과 페이지에 사진이 보내지는 것과, AXIOS 응답이 
  *    정상적으로 동작하는 것만 확인됨)
  * 
  */}
// NavigationProp 타입 정의
type RootStackParamList = {
  result: { photo: string };
};

// 어플리케이션 초기 실행시 카메라와 내부 저장소 접근 권한을 받아오는 함수
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

const Analyze: React.FC = () => {
  // 사진 데이터 저장 Prop
  const [photo, setPhoto] = useState<string | null>(null);
  // 바텀 시트 표시 여부 Prop
  const [isVisible, setIsVisible] = useState(false);
  // NavigationProp으로 타입 정의
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); 

  useEffect(() => {
    // 초기 실행 시 카메라 권한 요청
    requestCameraPermission();
  }, []);

  // 카메라로 사진을 찍는 함수 
  const camera = async () => {
    // 사용자가 카메라 권한을 허용했는지 확인한다. 
    const hasPermission = await requestCameraPermission();
    //권한이 없을 경우 종료된다. 
    if (!hasPermission) {
      console.log("카메라 권한이 거부되었습니다");
      return;
    }

    try {
      console.log("카메라를 실행합니다");
      const result = await launchCamera({
        mediaType: 'photo', // mediaType 지정, video로 할경우 동영상 촬영 가능(음성 녹음 권한 추가로 필요)
        cameraType: 'back', // 후면카메라 
      });

      // 사진 촬영 과정중 오류가 발생하면 종료한다. 
      if (result.didCancel || !result.assets || result.assets.length === 0) {
        return;
      }

      // 사진 촬영이 완료되면 사진의 경로를 photo에 저장한다.
      const localUri = result.assets[0].uri;
      const uriPath = localUri.split("//").pop();
      setPhoto("file://" + uriPath);

      // 바텀시트를 닫는다. 
      setIsVisible(false); 
    } catch (error) {
      console.error("카메라 실행 중 오류 발생: ", error);
    }
  };

  // 내부 저장소에서 사진을 불러오는 함수 
  const imageLibrary = async () => {
    try {
      console.log("사진 라이브러리를 실행합니다");
      const result = await launchImageLibrary({
        mediaType: 'photo',
      });
      if (result.didCancel || !result.assets || result.assets.length === 0) {
        return;
      }
      const localUri = result.assets[0].uri;
      const uriPath = localUri.split("//").pop();
      setPhoto("file://" + uriPath);
      setIsVisible(false); // 선택 후 바텀 시트 닫기
    } catch (error) {
      console.error("사진 라이브러리 실행 중 오류 발생: ", error);
    }
  };

  // result 페이지로 리다이렉트. 파라미터로 사진 전송
  const handleAnalyze = () => {
    if (photo) {
      navigation.navigate('result', { photo });
    }
  };

  // 바텀 시트 리스트 
  // title: 보이는 텍스트 
  // onPress: 버튼을 눌렀을 때 실행할 함수
  // containerStyle: 버튼의 배경색 지정
  // titleStyle: 버튼의 텍스트 색 지정
  const list = [
    {
      title: '카메라로 사진 찍기',
      onPress: camera,
    },
    {
      title: '사진 불러오기',
      onPress: imageLibrary,
    },
    {
      title: '취소',
      containerStyle: { backgroundColor: '#EB5050' },
      titleStyle: { color: 'white' },
      onPress: () => setIsVisible(false),
    },
    {
      title: '전송',
      containerStyle: { backgroundColor: '#00EF91' },
      titleStyle: { color: 'white' },
      onPress: handleAnalyze
    }
  ];

  return (
    <SafeAreaView style={analyzePageLayout.totalContainer}>
      {/* 상단 flex = 1 */}
      <View style={analyzePageLayout.topContainer}>
        {/* Title Text */}
        <View style={analyzePageLayout.pageTitleContainer}>
          <Text style={analyzePageLayout.pageTitleText}>당신의 강아지 사진을 올려주세요</Text>
        </View>
      </View>

      {/* 중단 flex = 9 */}
      <View style={analyzePageLayout.middleContainer}>
        <ImageBackground
          style={analyzePageLayout.mainImage}
          // 사용자가 이미지를 올리기 전에는 기본 이미지 출력, 사용자가 이미지를 올리면 해당 이미지 출력 
          source={photo ? { uri: photo } : require('../../assets/images/main.jpg')}
        >
        </ImageBackground>
      </View>

      {/** 하단 flex = 1 */}
      <View style={analyzePageLayout.bottomContainer}>
        <Button
          title="사진 제출하기"
          onPress={() => setIsVisible(true)} // 바텀 시트 열기
          buttonStyle={analyzePageLayout.bottomSheetBtn}
        />
      </View>

      {/* 바텀 시트 */}
      <BottomSheet modalProps={{}} isVisible={isVisible}>
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>

    </SafeAreaView>
  );
}

export default Analyze;
