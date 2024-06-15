import { View, Text } from 'react-native'
import React from 'react'
import PostItem from './PostItem'
    /*현재는 포스트 내용을 로컬로 하드코딩 해놓음 -> 추후 백엔드 개발자와 협업을 통해 Server 에서 받아오도록 수정할 예정 */
const postInfo =[
  {
    postTitle: '한승헌',
    postPersonImage: require('../../assets/images/userProfile.jpeg'),
    postImage: require('../../assets/images/post1.jpeg'),
    likes: 765,
    isLiked: true, 
  },
  {
    postTitle: '박덕수',
    postPersonImage: require('../../assets/images/profile5.jpeg'),
    postImage: require('../../assets/images/post2.jpeg'),
    likes: 715,
    isLiked: false, 
  },
  {
    postTitle: '김국광',
    postPersonImage: require('../../assets/images/profile4.jpeg'),
    postImage: require('../../assets/images/post3.jpeg'),
    likes: 55,
    isLiked: false, 
  },{
    postTitle: '곽웅철',
    postPersonImage: require('../../assets/images/profile3.jpeg'),
    postImage: require('../../assets/images/post4.jpeg'),
    likes: 765,
    isLiked: true, 
  }
]

const Posts = () => {
  return (
    <View>
      {postInfo.map((data, index) => {
        return (
         <PostItem key={index} data={data}/>
        )
      })}
    </View>
  )
}
export default Posts