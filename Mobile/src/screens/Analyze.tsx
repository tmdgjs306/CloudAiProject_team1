import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ImageBackground, ScrollView, Platform } from 'react-native';
import { BottomSheet, Button, ListItem } from '@rneui/themed';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { analyzePageLayout } from '../styleSheet/analyzePageLayout';
import { camera, imageLibrary } from '../api/ImagePicker';  
import { request, PERMISSIONS } from 'react-native-permissions';

type RootStackParamList = {
  result: { photo: string };
};

const Analyze: React.FC = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); 
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

  
  useEffect(() => {
    const requestPermissions = async () => {
      await requestCameraPermission();
    };
    requestPermissions();
  }, []);

  const handleAnalyze = () => {
    if (photo) {
      navigation.navigate('result', { photo });
    }
  };

  const list = [
    {
      title: '카메라로 사진 찍기',
      onPress: () => camera(setPhoto, setIsVisible),
    },
    {
      title: '사진 불러오기',
      onPress: () => imageLibrary(setPhoto, setIsVisible),
    },
    {
      title: '취소',
      containerStyle: { backgroundColor: '#EB5050' },
      titleStyle: { color: 'white' },
      onPress: () => setIsVisible(false),
    },
  ];

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <SafeAreaView style={analyzePageLayout.totalContainer}>
        <View style={analyzePageLayout.topContainer}>
          <View style={analyzePageLayout.pageTitleContainer}>
            <Text style={analyzePageLayout.pageTitleText}>당신의 강아지 사진을 올려주세요</Text>
          </View>
        </View>
        <View style={analyzePageLayout.middleContainer}>
          <ImageBackground
            style={analyzePageLayout.mainImage}
            source={photo ? { uri: photo } : require('../../assets/images/main.jpg')}
          >
          </ImageBackground>
        </View>
        <View style={analyzePageLayout.bottomContainer}>
          <Button
            title="사진 제출하기"
            titleStyle ={analyzePageLayout.bottomSheetBtnTitle}
            onPress={photo ? handleAnalyze : () => setIsVisible(true)}
            buttonStyle={analyzePageLayout.bottomSheetBtn}
          />
          {photo && (
            <Button
              title="사진 다시 고르기"
              titleStyle={[analyzePageLayout.bottomSheetBtnTitle]}
              onPress={() => setIsVisible(true)}
              buttonStyle={[analyzePageLayout.bottomSheetBtn, {backgroundColor: 'tomato'}]}
            />     
          )}
        </View>
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
    </ScrollView>
  );
};

export default Analyze;
