import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, Image} from 'react-native';
import React, { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { request, PERMISSIONS } from 'react-native-permissions';
import {camera, imageLibrary} from '../api/ImagePicker';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonGroup } from '@rneui/themed';

const SignScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const navigation = useNavigation();
    const auth = getAuth();
    const [photo, setPhoto] = useState('');
    const reduxUser = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0); // New state for pet size selection
    const petSizes = ['소', '중', '대'];

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
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, {
                displayName: name,
                photoURL: 'https://www.example.com/profile.png',
                phoneNumber: phone,
            });
            console.log(user);
            Toast.show({
                type: 'success',
                text1: '회원가입 성공',
                text2: `${email}으로 가입되었습니다.`
            });
            navigation.replace('Login');
        } catch (error) {
            console.log(error.message);
            Alert.alert(
                "회원가입 도중에 문제가 발생했습니다.",
                error.message,
                [{ text: '닫기' }],
                { cancelable: true }
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>회원가입</Text>
            <View style={styles.profileContainer}>
                <Image style={styles.profileImage} source={photo ? { uri: photo } : require("../../assets/images/sign_profile.png")} />
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => imageLibrary(setPhoto, setIsVisible)}
                >
                    <Text style={styles.buttonText}>사진변경</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.formContainer}>
                <TextInput
                    placeholder="이름"
                    placeholderTextColor="black"
                    value={name}
                    onChangeText={text => setName(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="주소"
                    placeholderTextColor="black"
                    value={address}
                    onChangeText={text => setAddress(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="우편번호"
                    placeholderTextColor="black"
                    value={address}
                    onChangeText={text => setAddress(text)}
                    style={styles.input}
                />
                <View style={styles.radioContainer}>
                    <Text style={styles.radioTitle}>반려동물 크기를 입력해주세요:</Text>
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
                    style={styles.input}
                />
                <TextInput
                    placeholder="비밀번호"
                    placeholderTextColor="black"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
                <TextInput
                    placeholder="비밀번호 재입력"
                    placeholderTextColor="black"
                    value={confirmPassword}
                    onChangeText={text => setConfirmPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.applyButton} onPress={handleSignUp}>
                    <Text style={styles.applyButtonText}>회원가입</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.cancelButtonText}>취소</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SignScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: 'black'
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10
    },
    formContainer: {
        marginBottom: 20
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 10,
        borderColor: '#DDD',
        borderWidth: 1,
        color: 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: '#50B4F5',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: '500'
    },
    applyButton: {
        backgroundColor: '#50B4F5',
        flex: 1,
        marginRight: 10,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    cancelButton: {
        backgroundColor: 'tomato',
        flex: 1,
        marginLeft: 10,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    applyButtonText: {
        color: 'white',
        fontWeight: '500'
    },
    cancelButtonText: {
        color: 'white',
        fontWeight: '500'
    },
    radioContainer: {
        marginBottom: 20,
    },
    radioTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black'
    }
});
