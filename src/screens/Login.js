import { Alert, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import loginPageLayout from '../styleSheet/loginPageLayout';
import {SERVER_ADDRESS} from "@env";

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const auth = getAuth();
    const reduxUser = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUserInfo = async (email) => {
            try {
                
                const response = await fetch(SERVER_ADDRESS+`/app/getUserInfo?email=${email}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user info from server');
                }
                const userInfo = await response.json();
                console.log(userInfo);
                return userInfo;
            } catch (error) {
                console.error('Error fetching user info:', error.message);
                return null;
            }
        };

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log(user);
                const userInfo = await fetchUserInfo(user.email);

                if (userInfo) {
                    // Redux 저장소에 유저 정보 저장
                    dispatch({
                        type: 'ADD_USER',
                        isLogin: true,  // 로그인 여부 판별 
                        id: userInfo.id, // 유저테이블 PK 
                        userId: userInfo.userId, // 유저 로그인 아이디 
                        email: userInfo.email, // 유저 이메일 
                        profileImageUrl: userInfo.profileImageUrl, // 유저 프로필 이미지 주소 
                        nickname: userInfo.nickname, // 유저 닉네임 
                        region: userInfo.region, // 사는 지역 
                        size: userInfo.size, // 키우는 반려견 크기 
                        posts: userInfo.posts, // 작성한 게시글 수 
                        followers: userInfo.followers, // 팔로워 수 
                        following: userInfo.following, // 팔로잉 수 
                    });

                    navigation.replace('Bottom');
                } else {
                    console.error('User info is null');
                }
            }
        });

        return unsubscribe;
    }, [auth, dispatch, navigation]);

    const handleSignUp = () => {
        navigation.replace('Sign');
    };

    const handleGuestLogin = () => {
        navigation.replace('Bottom');
    };

    const handleTest = () => {
        navigation.replace('Feed');
    };

    const handleLogin = async () => {
        console.log("test!");
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            Alert.alert(
                "로그인에 실패하였습니다.",
                error.message,
                [{ text: '닫기', onPress: () => console.log('닫기') }],
                { cancelable: true }
            );
        }
    };

    const handleGoogleSign = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const googleCredential = GoogleAuthProvider.credential(userInfo.idToken);
            await signInWithCredential(auth, googleCredential);
        } catch (error) {
            console.error(error);
            Alert.alert(
                "Google 로그인에 실패하였습니다.",
                error.message,
                [{ text: '닫기', onPress: () => console.log('닫기') }],
                { cancelable: true }
            );
        }
    };

    return (
        <View style={loginPageLayout.container}>
            {/* 상단 디자인 */}
            <View style={loginPageLayout.logoImageContainer}>
                <Image style={loginPageLayout.logo} source={require('../../assets/images/logo.png')} />
                <Text style={loginPageLayout.logoText}>부멍님이 누구니?</Text>
            </View>
            {/* 폼 디자인 */}
            <View style={loginPageLayout.inputContainer}>
                <TextInput
                    placeholder="email"
                    placeholderTextColor="black"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={loginPageLayout.input}
                />
                <TextInput
                    placeholder="password"
                    placeholderTextColor="black"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={loginPageLayout.input}
                    secureTextEntry
                />
            </View>
            <View style={loginPageLayout.buttonContainer}>
                <TouchableOpacity
                    style={loginPageLayout.button}
                    onPress={handleLogin}
                >
                    <Text style={loginPageLayout.buttonText}>로그인</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={loginPageLayout.button}
                    onPress={handleSignUp}
                >
                    <Text style={loginPageLayout.buttonText}>회원가입</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={loginPageLayout.button}
                    onPress={handleGuestLogin}
                >
                    <Text style={loginPageLayout.buttonText}>게스트 로그인</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={loginPageLayout.button}
                    onPress={handleTest}
                >
                    <Text style={loginPageLayout.buttonText}>Test</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;
