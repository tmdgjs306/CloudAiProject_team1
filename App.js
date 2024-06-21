import React, {useEffect} from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/Home";
import ActivityScreen from "./src/screens/Activity";
import SearchScreen from "./src/screens/Search";
import ProfileScreen from "./src/screens/Profile";
import StatusScreen from "./src/screens/Status";
import FriendProfileScreen from "./src/screens/FriendProfile";
import EditProfileScreen from "./src/screens/EditProfile";
import {NavigationContainer} from "@react-navigation/native";
import Ionic from "react-native-vector-icons/Ionicons";
import AnalyzeScreen from "./src/screens/Analyze";
import ResultScreen from "./src/screens/result";
import LoginScreen from "./src/screens/Login";
import SignScreen from "./src/screens/Sign";
import app from './firebase';
import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./src/redux/reducers/userReducer";
import {Provider} from "react-redux";
import EditPostScreen from "./src/screens/EditPost";
const App = () =>{
    //redux store configuration
    const store = configureStore({
        reducer: {
            user: userReducer,
        }
    })

    //redux Test Code Store UserData
    // console.log('store.getState()', store.getState());
    // store.dispatch({
    //     type: 'ADD_USER',
    //     isLogin: true,
    //     email: "test123@gmail.com",
    //     name: "testPerson",
    //     imgUrl: "www.example.com/image.png",
    // });
    // console.log('store.getState()', store.getState());

    // Stack Navigator 
    const Stack = createNativeStackNavigator();

    // Bottom Tab Navigator Configuration
    const Tab = createBottomTabNavigator();
    const BottomTabScreen = () =>{
        return (
            // Bottom Navigator Style Configuration
            <Tab.Navigator 
                screenOptions={({route}) =>({
                    tabBarHideOnKeyboard: true,
                    tabBarShowLabel: false,
                    headerShown: false,
                    tabBarStyle:{
                        height: 70
                    },
                    tabBarIcon: ({focused,size,color})=>{
                        let iconName;
                        color = focused ? 'skyblue' : 'black';
                        if(route.name === "Home"){
                            iconName = focused? 'home-sharp' : 'home-outline'
                        } else if (route.name === "Activity"){
                            iconName = focused? 'heart' : 'heart-outline'
                        } else if (route.name === "Profile"){
                            iconName = focused? 'person-circle' : 'person-circle-outline'
                        } else if (route.name === "Analyze"){
                            iconName = focused? 'camera-sharp' : 'camera-outline'
                        }           
                        return <Ionic name={iconName} size={size} color={color} />
                    },
                })}
            >
                <Tab.Screen name= "Home" component={HomeScreen} />
                <Tab.Screen name="Analyze" component={AnalyzeScreen} />
                <Tab.Screen name = "Activity" component={ActivityScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        );
    }
    
    return (
        <Provider store={store}>
        <NavigationContainer
            screenOptions ={{
            }}
        >
            <Stack.Navigator  screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name = "Login" component={LoginScreen}/>
                <Stack.Screen name = "Bottom" component={BottomTabScreen} />
                <Stack.Screen name = "Status" component={StatusScreen} /> 
                <Stack.Screen name = "FriendProfile" component={FriendProfileScreen} /> 
                <Stack.Screen name = "EditProfile" component={EditProfileScreen} /> 
                <Stack.Screen name = "result" component={ResultScreen} /> 
                <Stack.Screen name = "Sign" component={SignScreen} /> 
            </Stack.Navigator>
        </NavigationContainer>
        </Provider>
    );
}

export default App;