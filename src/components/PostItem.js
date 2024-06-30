import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import {SERVER_ADDRESS} from "@env";

const PostItem = ({ data }) => {
  const [like, setLike] = useState(data.isLiked);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const user = useSelector((state) => state.user);
  const [likes, setLikes] = useState(data.likes);
  /**
   * 
   * 좋아요 관련 로직
   *  
   */  
  const handleLike = async () => {
    // 좋아요 취소 
    if(like){
      setLike(false);
      const response = await fetch (SERVER_ADDRESS+"/app/unlike?"+`feedId=${data.feedId}&loggedUserId=${user.id}`,{
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('좋아요 처리에 실패하였습니다.');
      }
      const responseData = await response.json();
      const recentLike = responseData.likes;
      setLikes(recentLike);
    }
      
    // 좋아요
    else{
      setLike(true);
      const response = await fetch (SERVER_ADDRESS+"/app/like?"+`feedId=${data.feedId}&loggedUserId=${user.id}`,{
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('좋아요 처리에 실패하였습니다.');
      }
      const responseData = await response.json();
      const recentLike = responseData.likes;
      setLikes(recentLike);
    }
  }

  /**
   * 
   * 댓글 관련 로직
   *  
   */

  
  // 댓글 작성 로직 
  const handleSubmitComment = async () => {
    if (!comment.trim()) return; // 빈 댓글은 무시

    try {
      const response = await fetch(SERVER_ADDRESS+`/app/addComment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          userId: user.id,
          feedId: data.feedId,
        }),
      });

      if (response.ok) {
        console.log('댓글이 성공적으로 저장되었습니다.');
        setComment("");
        fetchComments(); // 댓글 추가 후 댓글 목록을 다시 불러옴
      } else {
        console.error('댓글 저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('댓글 저장 중 오류 발생:', error.message);
    }
  };

  //댓글 보여주는 로직 
  const handleShowComments = async () =>{
    if (showComments) {
      setShowComments(false);
    } else {
      fetchComments();
      setShowComments(true);
    }
  }

  // 피드 아이디 기준으로 댓글 목록 불러옴 
  const fetchComments = async () => {
    try {
      const response = await fetch(SERVER_ADDRESS+`/app/getComment?feedId=${data.feedId}`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('댓글 데이터를 가져오는 데 실패했습니다.');
      }
      const responseData = await response.json();
      const commentsArray = Object.values(responseData).map(comment => ({
        seq: comment.seq,
        userId: comment.userName,
        writerProfileImageUrl: comment.writerProfileImageUrl,
        content: comment.content,
      }));
      setComments(commentsArray);
    } catch (error) {
      console.error('댓글 데이터를 가져오는 중 에러 발생:', error.message);
    }
  };

  /**
   * 
   * 이미지 관련 로직 
   * 
   */
  // Default 이미지 설정 
  const defaultPersonImage = require('../../assets/images/sign_profile.png'); 
  const defaultPostImage = require('../../assets/images/main.jpg'); 

  // 이미지 불러옴 -> 만약 uri 값이 공백으로 온다면 프로필이미지, 게시판이미지 인지 판단 후
  // Default 이미지로 변경함 
  const getImageSource = (uri, type) => {
    if (uri && uri !== '') {
      return { uri };
    }
    return type === 'person' ? defaultPersonImage : defaultPostImage;
  };

  const renderCommentItem = ({ item }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
      <Image
        source={getImageSource(item.writerProfileImageUrl, 'person')}
        style={{
          width: 30,
          height: 30,
          borderRadius: 100,
          marginRight: 10,
        }}
      />
      <View>
        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'black' }}>{item.userId}</Text>
        <Text style={{ fontSize: 14, color: 'black' }}>{item.content}</Text>
      </View>
    </View>
  );

  return (
    <View
      style={{
        paddingBottom: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.3,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 15,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={getImageSource(data.imageUrl.uri, 'person')}
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
            }}
          />
          <View style={{ paddingLeft: 8 }}>
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black' }}>
              {data.writer}
            </Text>
          </View>
        </View>
        <Feather name="more-vertical" style={{ fontSize: 20 }} />
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={getImageSource(data.postImage.uri, 'post')}
          style={{ width: '100%', height: 400 }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 12,
          paddingVertical: 15,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <TouchableOpacity onPress={handleLike}>
            <AntDesign
              name={like ? 'heart' : 'hearto'}
              style={{
                paddingRight: 10,
                fontSize: 20,
                color: like ? 'red' : 'black',
              }}
            />
          </TouchableOpacity>
          <Text
          style={{
            color: 'black',
          }}
        >
           {likes} 명이 좋아합니다.
        </Text>

        </View>
      </View>
      <View style={{ paddingHorizontal: 15 }}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 14,
            color: 'black',
          }}
        >
          {data.content}
        </Text>

        <TouchableOpacity onPress={handleShowComments}>
          <Text style={{ opacity: 0.6, paddingVertical: 2, marginBottom: 5, marginTop: 5, color: 'black' }}>
            {showComments ? '댓글 숨기기' : '댓글 보기'}
          </Text>
        </TouchableOpacity>

        {showComments && (
          <FlatList
            data={comments}
            keyExtractor={(item) => item.seq.toString()}
            renderItem={renderCommentItem}
          />
        )}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={getImageSource(user.profileImageUrl, 'person')}
              style={{
                width: 25,
                height: 25,
                borderRadius: 100,
                marginRight: 10,
              }}
            />
            <TextInput
              placeholder="댓글 달기... "
              placeholderTextColor="black"
              value={comment}
              color="black"
              onChangeText={(text) => setComment(text)}
              style={{ opacity: 0.5 }}
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={handleSubmitComment}>
              <Text style={{ color: "#0095F6" }}>게시</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostItem;
