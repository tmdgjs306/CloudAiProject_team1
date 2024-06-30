import { Alert, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonGroup } from '@rneui/themed';
import { camera, imageLibrary } from '../api/ImagePicker';
import signPageLayout from '../styleSheet/signPageLayout';
import {SERVER_ADDRESS} from "@env";

const SignScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [id, setId] = useState('');

    const navigation = useNavigation();
    const [photo, setPhoto] = useState('');
    const reduxUser = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const petSizes = ['SMALL', 'MEDIUM', 'LARGE'];

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            Alert.alert(
                "비밀번호 불일치",
                "비밀번호와 비밀번호 재입력이 일치하지 않습니다.",
                [{ text: '닫기' }],
                { cancelable: true }
            );
            return;
        }

        const joinDto = {
            email: email,
            password: password,
            name: name,
            address: address,
            id: id,
            petSize: petSizes[selectedIndex]
        };

        try {
            const response = await fetch(SERVER_ADDRESS+`/app/joinApp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(joinDto)
            });

            if (response.ok) {
                Toast.show({
                    type: 'success',
                    text1: '회원가입 성공',
                    text2: `${email}으로 가입되었습니다.`
                });
                // firebase DB에 유저 정보 추가 
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                navigation.replace('Login');
            } else {
                const errorData = await response.json();
                Alert.alert(
                    "회원가입 실패",
                    errorData.message || "알 수 없는 오류가 발생했습니다.",
                    [{ text: '닫기' }],
                    { cancelable: true }
                );
            }
        } catch (error) {
            console.error(error);
            Alert.alert(
                "회원가입 도중에 문제가 발생했습니다.",
                error.message,
                [{ text: '닫기' }],
                { cancelable: true }
            );
        }
    };

    return (
        <View style={signPageLayout.container}>
            <Text style={signPageLayout.title}>회원가입</Text>
            <View style={signPageLayout.profileContainer}>
                <Image style={signPageLayout.profileImage} source={photo ? { uri: photo } : require("../../assets/images/sign_profile.png")} />
                <TouchableOpacity 
                    style={signPageLayout.button}
                    onPress={() => imageLibrary(setPhoto, setIsVisible)}
                >
                    <Text style={signPageLayout.buttonText}>사진변경</Text>
                </TouchableOpacity>
            </View>
            <View style={signPageLayout.formContainer}>
                <TextInput
                    placeholder="닉네임"
                    placeholderTextColor="black"
                    value={name}
                    onChangeText={text => setName(text)}
                    style={signPageLayout.input}
                />
                <TextInput
                    placeholder="사는 지역"
                    placeholderTextColor="black"
                    value={address}
                    onChangeText={text => setAddress(text)}
                    style={signPageLayout.input}
                />
                <View style={signPageLayout.radioContainer}>
                    <Text style={signPageLayout.radioTitle}>반려동물 크기를 입력해주세요:</Text>
                    <ButtonGroup
                        onPress={(index) => setSelectedIndex(index)}
                        selectedIndex={selectedIndex}
                        buttons={petSizes}
                        containerStyle={{ marginBottom: 20 }}
                    />
                </View>
                
                <TextInput
                    placeholder="이메일"
                    placeholderTextColor="black"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={signPageLayout.input}
                />
                <TextInput
                    placeholder = "아이디"
                    placeholderTextColor="black"
                    value = {id}
                    onChangeText = {text => setId(text)}
                    style = {signPageLayout.input}
                />
                <TextInput
                    placeholder="비밀번호"
                    placeholderTextColor="black"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={signPageLayout.input}
                    secureTextEntry
                />
                <TextInput
                    placeholder="비밀번호 재입력"
                    placeholderTextColor="black"
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
                    style={signPageLayout.input}
                    secureTextEntry
                />
            </View>
            <View style={signPageLayout.buttonContainer}>
                <TouchableOpacity style={signPageLayout.applyButton} onPress={handleSignUp}>
                    <Text style={signPageLayout.applyButtonText}>회원가입</Text>
                </TouchableOpacity>
                <TouchableOpacity style={signPageLayout.cancelButton} onPress={() => navigation.navigate("Login")}>
                    <Text style={signPageLayout.cancelButtonText}>취소</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SignScreen;
