import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { imageLibrary } from '../api/ImagePicker'; // 이미지 선택을 위한 함수 가져오기
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const EditPost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const navigation = useNavigation();
    const serverUrl = "http://localhost";
    // 이미지 라이브러리 호출 
    const handleImagePick = () => {
        imageLibrary(setImage);
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
                    onPress: () => navigation.navigate('Home')
                }
            ],
            { cancelable: false }
        );
    };
    
    const handlePost = async () => {
        if (!title || !content) {
            Alert.alert("제목과 내용을 모두 입력하세요.");
            return;
        }
        try {
            const post = {
                title: title,
                content: content,
                image: image,
                createdAt: new Date(),
            };
            const response = await axios.post(serverUrl, post);
            if (response.status === 200) {
                console.log("Post successfully uploaded: ", response.data);
                Alert.alert("게시가 완료되었습니다.");
                navigation.navigate('Home'); // 메인 페이지로 리다이렉션
            } else {
                Alert.alert("게시 중 오류가 발생했습니다.");
            }
        } catch (error) {
            Alert.alert("게시 중 오류가 발생했습니다.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>새 글 작성</Text>
            <TextInput
                style={styles.input}
                placeholder="제목을 입력하세요"
                placeholderTextColor="gray"
                value={title}
                onChangeText={text => setTitle(text)}
            />
            <TextInput
                style={styles.textArea}
                placeholder="내용을 입력하세요"
                placeholderTextColor="gray"
                value={content}
                onChangeText={text => setContent(text)}
                multiline={true}
                numberOfLines={4}
            />
            <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <Feather name='camera' style={styles.icon} />
                )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handlePost}>
                <Text style={styles.buttonText}>게시하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor : 'tomato', marginTop: 10}]} onPress={handleExit}>
                <Text style={styles.buttonText}>취소</Text>
            </TouchableOpacity>
        </View>
    );
};

export default EditPost;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'black',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        color: 'black',
    },
    textArea: {
        height: 100,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingTop: 10,
        marginBottom: 10,
        color: 'black',
    },
    imagePicker: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    icon: {
        fontSize: 50,
        color: 'gray',
    },
    button: {
        backgroundColor: '#50B4F5',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
