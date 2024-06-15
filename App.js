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
const App = () =>{

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
        <NavigationContainer
            screenOptions ={{
            }}
        >
            <Stack.Navigator  screenOptions={{
                headerShown: false,
            }}>
                <Stack.Screen name = "Bottom" component={BottomTabScreen} />
                <Stack.Screen name = "Status" component={StatusScreen} /> 
                <Stack.Screen name = "FriendProfile" component={FriendProfileScreen} /> 
                <Stack.Screen name = "EditProfile" component={EditProfileScreen} /> 
                <Stack.Screen name = "result" component={ResultScreen} /> 
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;