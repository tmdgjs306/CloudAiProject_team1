import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {SERVER_ADDRESS} from "@env";

const Result = ({ route }) => {
  const { photo } = route.params;
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dogAge, setDogAge] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState(null);
  const [showAgeInput, setShowAgeInput] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAnalysisResult = async () => {
      try {
        const formData = new FormData();
        formData.append('file', {
          uri: photo,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });

        const response = await axios.post(SERVER_ADDRESS+`/app/getPredictData`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Received analysis result:', response.data);
        setAnalysisResult(response.data);
      } catch (error) {
        console.error('Error fetching analysis result:', error);
      } finally {
        console.log('Finished fetching analysis result');
        setLoading(false);
      }
    };
    fetchAnalysisResult();
  }, [photo]);

  const handleGetMoreInfo = async () => {
    if (!dogAge) {
      alert('나이를 입력해주세요.');
      return;
    }

    try {
      const maxResult = getMaxValueResult(analysisResult);
      const response = await axios.get('http://localhost:8190/app/getMoreInfo', {
        params: {
          dog_id: maxResult.dog_id,
          dog_age: dogAge,
        },
      });
      console.log('Received additional info:', response.data);
      setAdditionalInfo(response.data);
      setShowAgeInput(false); // 추가 정보를 가져온 후 나이 입력 부분 숨기기
    } catch (error) {
      console.error('Error fetching additional info:', error);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const getMaxValueResult = (result) => {
    let maxValue = -Infinity;
    let maxValueKey = null;

    Object.keys(result).forEach((key) => {
      if (key.startsWith('class_') && result[key][0]?.value > maxValue) {
        maxValue = result[key][0].value;
        maxValueKey = key;
      }
    });

    return maxValueKey ? result[maxValueKey][0] : null;
  };

  const decodeUnicode = (str) => {
    if (str === undefined || str === null) {
      return ''; // 또는 적절한 기본값으로 대체할 수 있습니다.
    }
    return decodeURIComponent(JSON.parse(`"${str.replace(/\"/g, '\\"')}"`));
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#6200ea" />
        <Text style={styles.loadingText}>사진을 전송중입니다...</Text>
      </View>
    );
  }

  const maxResult = analysisResult ? getMaxValueResult(analysisResult) : null;

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>분석결과</Text>
        </View>
        <Image source={{ uri: photo }} style={styles.photo} />
        {maxResult && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>품종</Text>
            <Text style={styles.resultText}>{maxResult.name || '정보 없음'}</Text>
            <Text style={styles.resultLabel}>정보</Text>
            <Text style={styles.resultText}>{maxResult.general_info || '정보 없음'}</Text>
            <Text style={styles.resultLabel}>함께 키우면 좋은 견종</Text>
            {maxResult.friend_info?.map((friend, index) => (
              <Text key={index} style={styles.resultText}>
                {friend.name}: {friend.value}
              </Text>
            )) || <Text style={styles.resultText}>정보 없음</Text>}
            <Text style={styles.resultLabel}>훈련정보</Text>
            <Text style={styles.resultText}>{maxResult.training_info || '정보 없음'}</Text>
          </View>
        )}
        {!showAgeInput && !additionalInfo && (
          <TouchableOpacity style={styles.submitBtn} onPress={() => setShowAgeInput(true)}>
            <Text style={styles.buttonText}>추가 정보 입력하고 더 많은 정보 얻기</Text>
          </TouchableOpacity>
        )}
        {showAgeInput && (
          <View style={styles.ageInputContainer}>
            <TextInput
              style={styles.ageInput}
              placeholder="강아지 나이 입력"
              placeholderTextColor="black"
              color="black"
              keyboardType="numeric"
              value={dogAge}
              onChangeText={setDogAge}
            />
            <TouchableOpacity style={styles.submitBtn} onPress={handleGetMoreInfo}>
              <Text style={styles.buttonText}>제출</Text>
            </TouchableOpacity>
          </View>
        )}
        {additionalInfo && (
          <View style={styles.additionalInfoContainer}>
            <Text style={styles.additionalInfoTitle}>추가 정보</Text>
            {additionalInfo[0]?.health_info?.map((info, index) => (
              <View key={index} style={styles.additionalInfoItem}>
                <Text style={styles.resultLabel}>{decodeUnicode(info['병명'])}</Text>
                <Text style={styles.resultText}>{decodeUnicode(info['설명'])}</Text>
                <Text style={styles.resultText}>{decodeUnicode(info['예방 및 관리'])}</Text>
                <Text style={styles.resultText}>{decodeUnicode(info['증상'])}</Text>
              </View>
            ))}
            <Text style={styles.resultText}>생활 단계: {decodeUnicode(additionalInfo[0]?.lifecycle_state) || '정보 없음'}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.backBtn} onPress={handleGoBack}>
          <Text style={styles.buttonText}>뒤로가기</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  photo: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    marginBottom: 20,
  },
  resultContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  resultLabel: {
    fontSize: 18,
    color: '#6200ea',
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  resultText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'left',
    lineHeight: 24,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  backBtn: {
    marginTop: 20,
    backgroundColor: 'tomato',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitBtn: {
    marginTop: 20,
    backgroundColor: 'skyblue',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ageInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  additionalInfoContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  additionalInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6200ea',
  },
  additionalInfoItem: {
    marginBottom: 10,
  },
});

export default Result;
