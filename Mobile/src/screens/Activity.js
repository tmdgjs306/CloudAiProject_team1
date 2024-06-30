import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import {SERVER_ADDRESS} from "@env";

// UserProfile 컴포넌트 수정
const UserProfile = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);
  const User = useSelector((state) => state.user);

  const handleFollow = (to_user_id) => {
    const payload = {
      from_user_id: User.id, // 실제 사용자 ID로 대체
      to_user_id,
    };

    fetch(SERVER_ADDRESS+`/app/follow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => {
        if (response.ok) {
          setIsFollowing(!isFollowing);
          Alert.alert(
            isFollowing ? '팔로우 취소' : '팔로우',
            `${user.username}를 ${isFollowing ? '팔로우 취소했습니다.' : '팔로우했습니다.'}`
          );
        } else {
          Alert.alert('오류', '팔로우 요청을 처리하는 중 오류가 발생했습니다.');
        }
      })
      .catch(error => {
        console.error('Error following user:', error);
        Alert.alert('오류', '팔로우 요청을 처리하는 중 오류가 발생했습니다.');
      });
      if(!isFollowing){
        user.followers+=1;
      }
      else{
        user.followers-=1;
      }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{ uri: user.profileImageUrl }} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <View style={styles.profileInfoHeader}>
            <Text style={styles.username}>{user.username}</Text>
            <TouchableOpacity 
              style={[styles.followButton, isFollowing && styles.followingButton]} 
              onPress={() => handleFollow(user.id)}
            >
              <Text style={[styles.followButtonText, isFollowing && styles.followingButtonText]}>
                {isFollowing ? '팔로잉' : '팔로우하기'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.posts || 0}</Text>
              <Text style={styles.statLabel}>게시물</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.followers || 0}</Text>
              <Text style={styles.statLabel}>팔로워</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.following || 0}</Text>
              <Text style={styles.statLabel}>팔로잉</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

// OtherUserProfiles 컴포넌트 수정
const OtherUserProfiles = () => {
  const [users, setUsers] = useState([]);
  const User = useSelector((state) => state.user);
  useEffect(() => {
    fetch(SERVER_ADDRESS+`/app/getAllUser?userId=${User.id}`)
      .then(response => response.json())
      .then(data => {
        // 서버에서 받은 데이터가 예상대로 들어오는지 콘솔에 출력
        console.log(data);

        // data가 배열인지 객체인지 확인하여 사용자 리스트로 변환
        const userList = Array.isArray(data) ? data : Object.values(data).map(user => ({
          id: user.id, 
          username: user.nickname,
          profileImageUrl: user.profileImageUrl || 'https://placekitten.com/200/200',
          posts: user.posts || 0,
          followers: user.followers || 0,
          following: user.following || 0,
          isFollowing: user.isFollowing || false,
        }));
        
        setUsers(userList);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.friendsList}>
          <Text style={styles.friendsListTitle}>추천 친구 목록</Text>
        </View>
      }
      data={users}
      keyExtractor={(item) => item.id?.toString()} 
      renderItem={({ item }) => <UserProfile user={item} />}
      contentContainerStyle={styles.userProfilesContainer}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 15,
  },
  profileHeader: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  profileInfo: {
    marginLeft: 15,
    flex: 1,
  },
  profileInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  followButton: {
    backgroundColor: '#0095f6',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 5,
  },
  followingButton: {
    backgroundColor: '#e0e0e0',
  },
  followButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  followingButtonText: {
    color: 'black',
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  statLabel: {
    fontSize: 14,
    color: 'gray',
  },
  friendsList: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  friendsListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  userProfilesContainer: {
    paddingBottom: 50,
  },
});

export default OtherUserProfiles;
