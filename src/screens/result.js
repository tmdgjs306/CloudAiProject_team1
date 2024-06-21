import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity} from 'react-native';
import axios from 'axios';
import { resultPageLayout } from '../styleSheet/resultPageLayout';
import { useNavigation } from '@react-navigation/native';
{/*
  * Author: Han_Seung_Heon,
  * Function: AI 서버로 부터 판독 결과를 가져와 보여주는 페이지 
  * Date: 2024.06.15
  * ※ 현재 AI 서버 미구현으로 일부 기능만 동작 
  */}

const Result = ({ route }) => {
  const { photo } = route.params;
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAnalysisResult = async () => {
      try {

        // 사진 전송 양식 저장 ※ 현재는 AI 서버가 미구현 되어 사용 하지 않음 
        const formData = new FormData();
        formData.append('photo', {
          uri: photo,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });
        
        //AXIOS 테스트 코드 JSONplaceHolder 사이트를 이용하여 AXIOS 기능이 정상적으로 작동하는지 확인한다.  
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1',{
        }).then(response => setAnalysisResult(response.data));

        // 실제 AI 서버와 통신하여 데이터를 받아오는 코드 [현재 AI 서버 미구현으로 작동하지 않는다.]
        // const response = await axios.post('https://example.com/api/analyze', formData, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data',
        //     },
        //   });
        //   setAnalysisResult(response.data);

      } catch (error) {
        console.error('Error fetching analysis result:', error);
      } finally {
        console.log('Finished fetching analysis result');
        setLoading(false);
      }
    };
    fetchAnalysisResult();
  }, [photo]);

  if (loading) {
    return (
      <View style={resultPageLayout.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>사진을 전송중입니다...</Text>
      </View>
    );
  }
  const handleGoBack = () =>{
    navigation.goBack();
  }
  return (
    <View style={resultPageLayout.container}>
      <View style={resultPageLayout.titleContainer}>
        <Text style={resultPageLayout.title}>결과페이지</Text>
      </View>
      <Image source={{ uri: photo }} style={resultPageLayout.photo} />
      {analysisResult && (
        <View style={resultPageLayout.resultContainer}>
          {/*인공지능 서버에서 받아온 데이터를 보여주는 부분[현재는 작동하지 않는다.]*/}
          {/* <Text style={resultPageLayout.resultText}>분류: {analysisResult.classification_name}</Text>
          <Text style={resultPageLayout.resultText}>기본 정보: {analysisResult.Information_default}</Text>
          <Text style={resultPageLayout.resultText}>추가 정보: {analysisResult.Information}</Text> */}

          {/*Axios 테스트를 위해 임시로 작성한 부분 현재는 JsonPlaceHolder 사이트에서 데이터를 가져와 보여준다.*/}
          <Text style={resultPageLayout.resultText}>ID: {analysisResult.userId}</Text>
          <Text style={resultPageLayout.resultText}>id: {analysisResult.id}</Text>
          <Text style={resultPageLayout.resultText}>title: {analysisResult.title}</Text>
          <TouchableOpacity onPress={handleGoBack}>
            <Text style={{color:'black', fontSize:20}}>뒤로가기</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Result;
