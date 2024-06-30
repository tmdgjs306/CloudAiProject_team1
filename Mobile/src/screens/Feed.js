import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { homePageLayout } from '../styleSheet/homepageLayout';
import Stories from '../components/Stories';
import Posts from '../components/postsServer';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';
import { useDispatch, useSelector} from 'react-redux';
import Profile from './Profile';
import profileLayout from '../styleSheet/profileLayout';
import {SERVER_ADDRESS} from "@env";

const Feed = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [refresh, setRefresh] = useState(false);
  const auth = getAuth();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.user);
  
  const handleEditPost = () => {
    navigation.navigate('EditPost');
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch({ type: 'DELETE_USER' });
      navigation.replace('Login');
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfileImageChange = () => {
    setRefresh(prev => !prev); // 상태 변경으로 리렌더링 트리거
  };

  // 화면이 포커스될 때마다 데이터를 갱신하도록 설정
  useEffect(() => {
    const fetchData = async () => {
      if (isFocused) {
        setRefresh(prev => !prev);
      }
      try {
        const fetchUserInfo = async (email) => {
            try {
                
                const response = await fetch(SERVER_ADDRESS+`/app/getUserInfo?email=${email}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user info from server');
                }
                const userInfo = await response.json();
                console.log(userInfo);
                return userInfo;
            } catch (error) {
                console.error('Error fetching user info:', error.message);
                return null;
            }
        };
        const userInfo = await fetchUserInfo(User.email);
        if (userInfo) {
          // Redux 저장소에 유저 정보 저장
          dispatch({
            type: 'ADD_USER',
            isLogin: true,  // 로그인 여부 판별 
            id: userInfo.id, // 유저테이블 PK 
            userId: userInfo.userId, // 유저 로그인 아이디 
            email: userInfo.email, // 유저 이메일 
            profileImageUrl: userInfo.profileImageUrl, // 유저 프로필 이미지 주소 
            nickname: userInfo.nickname, // 유저 닉네임 
            region: userInfo.region, // 사는 지역 
            size: userInfo.size, // 키우는 반려견 크기 
            posts: userInfo.posts, // 작성한 게시글 수 
            followers: userInfo.followers, // 팔로워 수 
            following: userInfo.following, // 팔로잉 수 
          });
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchData();
  }, [isFocused, User.email, dispatch]);

  const renderHeader = () => (
    <View>
      <View style={homePageLayout.HeaderContainer}>
        <View>
          <Text style={homePageLayout.HeaderText}>
            DogFeed
          </Text>
        </View>
        <View style={homePageLayout.HeaderIconContainer}>
          <TouchableOpacity onPress={handleEditPost}>
            <FontAwesome name="plus-square-o" style={{ fontSize: 24, paddingHorizontal: 15, color: 'blue' }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignOut}>
            <FontAwesome name="sign-out" style={{ fontSize: 24, color: 'tomato' }} />
          </TouchableOpacity>
        </View>
      </View>
      <Profile onProfileImageChange={handleProfileImageChange} />
    </View>
  );

  return (
    <SafeAreaView style={homePageLayout.TotalContainer}>
      <StatusBar style={homePageLayout.StatusBar} />
      <FlatList
        data={[{ key: 'posts' }]}
        keyExtractor={(item) => item.key}
        renderItem={() => (
            <Posts key={refresh.toString()} />    
        )}
        ListHeaderComponent={renderHeader}
      />
    </SafeAreaView>
  );
};

export default Feed;
