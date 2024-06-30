import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import PostItem from './PostItem';
import { useSelector } from 'react-redux';
import {SERVER_ADDRESS} from "@env";

const Posts = () => {
  const [postInfo, setPostInfo] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.id) {
      fetchPosts(user.id);
    }
  }, [user.id]);

  const fetchPosts = async (userId) => {
    try {
      // 서버에서 포스트 데이터를 가져오는 API 호출
      const response = await fetch(SERVER_ADDRESS+`/app/getSingleFeedData?userId=${userId}`, {
        method: 'GET',
        headers: {},
      });
      if (!response.ok) {
        throw new Error('서버에서 데이터를 가져오는 데 실패했습니다.');
      }
      const responseData = await response.json();
      console.log("Server Post Data: ", responseData);
      
      // 데이터를 배열로 변환하고, feedId를 기준으로 내림차순 정렬 -> 자바 스크립트는 객체 순회시 순서 보장 x 
      const postsArray = Object.values(responseData)
        .map(post => ({
          writer: post.writer,
          imageUrl: { uri: post.writerProfileImageUrl }, // using URI for network image
          postImage: { uri: post.imageUrl }, // using URI for network image
          content: post.content,
          feedId: post.feedId,
          likes: post.likes,
          isLiked: post.isLiked === 0 ? false : true, // assuming isLiked is boolean
        }))
        .sort((a, b) => b.feedId - a.feedId); // 내림차순 정렬

      setPostInfo(postsArray);
    } catch (error) {
      console.error('포스트 데이터를 가져오는 중 에러 발생:', error.message);
    }
  };

  return (
    <View>
      {postInfo.map((data, index) => (
        <PostItem key={index} data={data} />
      ))}
    </View>
  );
};

export default Posts;
