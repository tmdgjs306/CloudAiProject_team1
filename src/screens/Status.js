import { View, Text, SafeAreaView, TouchableOpacity, StatusBar, Image, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import Ionic from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

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
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />

      {/* 상단 디자인 */}
      <View style={styles.headerContainer}>
        <View style={styles.profileImageContainer}>
          {/* 프로필 이미지 */}
          <Image source={image} style={styles.profileImage} />
        </View>

        {/* 이름 및 취소 버튼 */}
        <View style={styles.headerRightContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <TouchableOpacity onPress={() => nav.goBack()}>
            <Ionic name="close" style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Story Image */}
      <Image source={image} style={styles.storyImage} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: '5%',
    left: '2.5%',
    width: '95%',
  },
  profileImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.1,
    height: width * 0.1,
  },
  profileImage: {
    borderRadius: width * 0.1 / 2,
    backgroundColor: 'orange',
    width: '92%',
    height: '92%',
    resizeMode: 'cover',
  },
  headerRightContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '92%',
    alignItems: 'center',
  },
  nameText: {
    color: 'white',
    fontSize: width * 0.05,
    paddingLeft: '3%',
  },
  closeIcon: {
    color: 'white',
    opacity: 0.6,
    fontSize: width * 0.07,
  },
  storyImage: {
    position: 'absolute',
    width: '100%',
    height: '80%',
  },
});

export default Status;
