import { View, Text, SafeAreaView, TouchableOpacity, StatusBar, Image, Dimensions } from 'react-native';
import React from 'react';
import Ionic from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import statusPageLayout from '../styleSheet/statusPageLayout';

const { width, height } = Dimensions.get('window'); // 현재 화면의 너비와 높이를 가져옵니다.
{/*
  * Author: Han_Seung_Heon,
  * Function: 스토리 보드 내용을 보여주는 페이지 
  * Date: 2024.06.15
  * ※ 디자인 수정 필요, 인스타 그램과의 지나친 유사성으로 상의 후 추후 삭제 예정 
  */}
const Status = ({ route, navigation }) => {
  const { name, image } = route.params;
  const nav = useNavigation();

  return (
    <SafeAreaView style={statusPageLayout.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />

      {/* 상단 디자인 */}
      <View style={statusPageLayout.headerContainer}>
        <View style={statusPageLayout.profileImageContainer}>
          {/* 프로필 이미지 */}
          <Image source={image} style={statusPageLayout.profileImage} />
        </View>

        {/* 이름 및 취소 버튼 */}
        <View style={statusPageLayout.headerRightContainer}>
          <Text style={statusPageLayout.nameText}>{name}</Text>
          <TouchableOpacity onPress={() => nav.goBack()}>
            <Ionic name="close" style={statusPageLayout.closeIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Story Image */}
      <Image source={image} style={statusPageLayout.storyImage} />
    </SafeAreaView>
  );
};

export default Status;
