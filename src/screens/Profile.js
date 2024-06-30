import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Certification from '../components/Certification';
import { imageLibrary } from '../api/ImagePicker';
import imageUpload from '../api/imageUpload';
import profileLayout from '../styleSheet/profileLayout'; // 스타일 파일 임포트
import axios from 'axios';
import {SERVER_ADDRESS} from "@env";

const Profile = ({ onProfileImageChange }) => {
  const navigation = useNavigation();
  const auth = getAuth();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch({ type: 'DELETE_USER' });
      navigation.replace('Login');
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfileImgChange = async () => {
    await imageLibrary(setPhoto, setIsVisible); // 이미지 라이브러리에서 이미지 선택
  };

  useEffect(() => {
    const uploadPhoto = async () => {
      if (photo) {
        let result = "";
        if (!photo) {
          Alert.alert("이미지를 선택하세요.");
          return;
        }
        result = await imageUpload(photo);
        if (!result) {
          Alert.alert("이미지 업로드 중 오류가 발생했습니다.");
          return;
        }
        const serverUrl = SERVER_ADDRESS+`/app/profileImageChange`;
        console.log(result);
        const postData = {
          imgUrl: result,
          id: user.id,
        };

        try {
          const response = await axios.post(serverUrl, postData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.status === 200) {
            console.log("프로필 이미지가 성공적으로 변경되었습니다.", response.data);
            Alert.alert("프로필 이미지가 변경되었습니다.");
            dispatch({ type: 'MODIFY_IMAGE', profileImageUrl: result });
            setPhoto(null);
            onProfileImageChange(); // 프로필 이미지 변경 후 콜백 호출
            navigation.navigate("Feed");
          } else {
            Alert.alert("프로필 이미지 변경 중 오류가 발생했습니다.");
          }
        } catch (error) {
          console.error("프로필 이미지 변경 중 오류가 발생했습니다.", error);
          Alert.alert("프로필 이미지 변경 중 오류가 발생했습니다.");
        }
      }
    };
    uploadPhoto();
  }, [photo]);

  useFocusEffect(
    useCallback(() => {
      console.log('Profile screen focused');
    }, [])
  );

  const profileImageSource = user.profileImageUrl ? { uri: user.profileImageUrl } : require('../../assets/images/sign_profile.png');

  return (
    <View style={profileLayout.container}>
      <View style={profileLayout.profileHeader}>
        <Image source={profileImageSource} style={profileLayout.profileImage} />
        <View style={profileLayout.userInfo}>
          <Text style={profileLayout.username}>{user.nickname}</Text>
          <Text style={profileLayout.userEmail}>{user.email}</Text>
        </View>
      </View>

      <View style={profileLayout.statsContainer}>
        <TouchableOpacity style={profileLayout.statItem}>
          <Text style={profileLayout.statNumber}>{user.posts}</Text>
          <Text style={profileLayout.statLabel}>게시물</Text>
        </TouchableOpacity>
      
        <TouchableOpacity style={profileLayout.statItem}>
          <Text style={profileLayout.statNumber}>{user.followers}</Text>
          <Text style={profileLayout.statLabel}>팔로워</Text>
        </TouchableOpacity>
        <TouchableOpacity style={profileLayout.statItem}>
          <Text style={profileLayout.statNumber}>{user.following}</Text>
          <Text style={profileLayout.statLabel}>팔로잉</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={profileLayout.editProfileButton}
        onPress={handleProfileImgChange}
      >
        <Text style={profileLayout.editProfileButtonText}>프로필 이미지 수정</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
