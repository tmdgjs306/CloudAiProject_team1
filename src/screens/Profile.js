import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Certification from '../components/Certification'
import {camera, imageLibrary} from '../api/ImagePicker';
import { useState } from 'react';
import imageUpload from '../api/imageUpload';


const Profile = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState('');

  const handleSignOut = async () => {
    try {
      await signOut(auth); // firebase 토큰 삭제 
      dispatch({
        type: 'DELETE_USER', // redux 저장소에 저장된 유저 정보 삭제 
      });
      navigation.replace('Login'); // 로그인 화면으로 이동 
    } catch (error) {
      console.log(error);
    }
  };
  const handleProfileImgChange = async () => {
    console.log("이미지 변경 함수 호출됨!");
    /* 이미지 업로드 api를 호출하여 이미지 업로드를 처리한다.
     * 기존 프로필 이미지를 삭제하고 새로운 이미지를 올리므로 이미지 주소는 변경되지 않는다.
     */
    const result = imageUpload(photo,'testUid');
    console.log(result);
  };
  return (
    <View style={styles.container}>
      {user.isLogin ? (
        <>
          {user.imgUrl !='' ?(
            <TouchableOpacity
              style = {styles.profileImage}
              onPress = {handleProfileImgChange}  
            >
            <Image source={{ uri: user.imgUrl }} style={styles.profileImage}/> 
            </TouchableOpacity>
          ):
             <TouchableOpacity
             style = {styles.profileImage}
             onPress = {handleProfileImgChange}  
             >
              <Image source={ require('../../assets/images/sign_profile.png')} style={styles.profileImage}/> 
            </TouchableOpacity>
          }
          <Text style={styles.nameText}>{user.name}</Text>
          <Text style={styles.emailText}>{user.email}</Text>
          <Text style={styles.phoneText}>{user.phoneNumber}</Text>
          <Button title="로그아웃" onPress={handleSignOut} />
        </>
      ) :
        <>
        <Certification/>
        </>
      }
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  emailText: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 5,
  },
  phoneText: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
});
