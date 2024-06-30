import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { imageLibrary } from '../api/ImagePicker'; // 이미지 선택을 위한 함수 가져오기
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import editPostLayout from '../styleSheet/editPostPageLayout'; // 스타일 파일 가져오기
import imageUpload from '../api/imageUpload';
import { useSelector } from 'react-redux';
import {SERVER_ADDRESS} from "@env";

const EditPost = () => {
    const [content, setContent] = useState('');
    const [photo, setPhoto] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    
    const navigation = useNavigation();
    const serverUrl = SERVER_ADDRESS+`/app/upload`;
    const user = useSelector((state) => state.user); 

    // 이미지 라이브러리 호출 
    const handleImagePick = () => {
        imageLibrary(setPhoto,setIsVisible);
    };

    // 게시글 작성 취소 
    const handleExit = () => {
        Alert.alert(
            "작성 취소",
            "정말로 작성을 취소하시겠습니까?",
            [
                {
                    text: "취소",
                    onPress: () => console.log("취소됨"),
                    style: "cancel"
                },
                {
                    text: "확인",
                    onPress: () => navigation.goBack(),
                }
            ],
            { cancelable: false }
        );
    };

    const handlePost = async () => {
        if (!content) {
            Alert.alert("내용을 입력해주세요!");
            return;
        }

        let result = '';
        if (photo) {
            result = await imageUpload(photo);
        }
        
        if (!result) {
            Alert.alert("이미지 업로드 중 오류가 발생했습니다.");
            return;
        }

        try {
            const post = {
                imgUrl: result,
                content: content,
                email: user.email,
            };
            const response = await axios.post(serverUrl, null, { params: post });
            if (response.status === 200) {
                console.log("Post successfully uploaded: ", response.data);
                Alert.alert("게시가 완료되었습니다.");
                navigation.goBack();
            } else {
                Alert.alert("게시 중 오류가 발생했습니다.");
            }
        } catch (error) {
            console.error("게시 중 오류가 발생했습니다.", error);
            Alert.alert("게시 중 오류가 발생했습니다.");
        }
    };

    return (
        <View style={editPostLayout.container}>

            <Text style={editPostLayout.header}>새 글 작성</Text>

            <TouchableOpacity style={editPostLayout.imagePicker} onPress={handleImagePick}>
                {photo ? (
                    <Image source={{ uri: photo }} style={editPostLayout.image} />
                ) : (
                    <Feather name='camera' style={editPostLayout.icon} />
                )}
            </TouchableOpacity>

            <TextInput
                style={editPostLayout.textArea}
                placeholder="내용을 입력하세요"
                placeholderTextColor="gray"
                value={content}
                onChangeText={text => setContent(text)}
                multiline={true}
                numberOfLines={4}
            />
            <TouchableOpacity style={editPostLayout.button} onPress={handlePost}>
                <Text style={editPostLayout.buttonText}>게시하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[editPostLayout.button, { backgroundColor: 'tomato', marginTop: 10 }]} onPress={handleExit}>
                <Text style={editPostLayout.buttonText}>취소</Text>
            </TouchableOpacity>
        </View>
    );
};

export default EditPost;
