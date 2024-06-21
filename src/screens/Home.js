import { View, Text, StatusBar, ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {homePageLayout} from '../styleSheet/homepageLayout';
import Stories from '../components/Stories';
import Posts from '../components/Posts';
import { useNavigation } from '@react-navigation/native';
{/*
  * Author: Han_Seung_Heon,
  * Function: 메인 페이지 (스토리보드, Feed 제공)
  * Date: 2024.06.15
  * ※ 현재 미구현
  */}


const Home = () => {
  const navigation = useNavigation();

  const handleEditPost = () =>{
    navigation.navigate('Profile');
  };
  return (
    <SafeAreaView style={homePageLayout.TotalContainer}
    >
     <StatusBar style={homePageLayout.StatusBar}
     />
     <ScrollView>
      <View style={homePageLayout.HeaderContainer}>
        <View>
          <Text style={homePageLayout.HeaderText}>
            DogFeed
          </Text>
        </View>
        <View
          style={homePageLayout.HeaderIconContainer}>
          <TouchableOpacity
            onPress={handleEditPost}
          >
            <FontAwesome name = "plus-square-o" style={{fontSize:24, paddingHorizontal: 15}}/>
          </TouchableOpacity>
          <Feather name = "navigation" style={{fontSize:24}}/>
        </View>     
      </View>
        {/*스토리 보드를 보여주는 부분 [※인스타 그램과 너무 유사하여 추후 삭제하거나, 다른 디자인으로 변경할 예정]*/}
        <Stories/>
        {/*사람들이 작성한 글 들을 보여주는 부분 [추후 메인 컬러인 BLUE 테마로 변경할 예정?] */}
        <Posts/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home;