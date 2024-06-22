import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { color } from '@rneui/base';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const auth = getAuth();
    const reduxUser = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                console.log(user);
                // 나중에 UID 값으로 DB 조회해서 넣는 방식으로 수정할 예정 
                // 현재는 Profile View 구현을 위해 하드코딩으로 값을 집어 넣음 
                // Redux 저장소에 유저 정보 저장 
                dispatch({
                    type: 'ADD_USER',
                    isLogin: true,
                    email: "tmdgjs306@naver.com",
                    imgUrl: "",
                    name: "한승헌",
                    phoneNumber: "010-2105-1282",
                })
                navigation.replace('Bottom');
            }
        })
        return unsubscribe;
    }, [])

   
    const handleSignUp = () =>{
      navigation.replace('Sign');
    }

    const handleGuestLogin = () =>{
        navigation.replace('Bottom');
    }

    const handleLogin = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            Alert.alert(
                "로그인에 실패하였습니다.",
                error.message, 
                [{ text: '닫기', onPress: () => console.log('닫기') }],
                { cancelable: true }
            )
        }
    }

    const handleTest = () =>{
        navigation.replace('Test');
    }

    return (
        
        <View
            style={styles.container}
        >
            {/*상단 디자인*/}
            <View style={styles.logoImageContainer}>
                <Image style={styles.logo} source={require('../../assets/images/logo.png')}></Image>
                <Text style={styles.logoText}>부멍님이 누구니?</Text>
            </View>
            {/*폼 디자인 */}
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="email"
                    placeholderTextColor="black"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="password"
                    placeholderTextColor="black"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}
                >
                <Text style={styles.buttonText}>로그인</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSignUp}
                >
                <Text style={styles.buttonText}>회원가입</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleGuestLogin}
                >
                <Text style={styles.buttonText}>게스트 로그인</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                    style={styles.button}
                    onPress={handleTest}
                >
                <Text style={styles.buttonText}>테스트 기능</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    logoImageContainer:{
        resizeMode: 'contain',
        paddingBottom: 30,
    },
    logo:{
        width: 0,
        height: 0,
    },
    logoText:{
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 10,
    },
    inputContainer: {
        width: '80%',
        marginTop: 15,
        color: 'black',
    },
    input: {
        backgroundColor: '#E2E2E2',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        color: 'black',
        marginBottom: 10,
    },
    buttonContainer: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    button: {
        backgroundColor: 'black',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText:{
        color: 'white',
        fontWeight: '500',
        fontSize: 16,
    },
})
