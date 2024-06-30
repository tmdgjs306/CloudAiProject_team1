import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; 
// 스토리를 서버에서 가져오는 페이지 ※ 현재 일부 구현 
const Stories = () => {
    const navigation = useNavigation(); 
    const [storyInfo, setStoryInfo] = useState([]); 
    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await axios.get('https://example.com/api/stories');
                setStoryInfo(response.data); 
            } catch (error) {
                console.error("Error fetching stories:", error); 
            }
        };
        fetchStories(); 
    }, []); 

    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ paddingVertical: 20 }}>
            {storyInfo.map((data, index) => {
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() =>
                            navigation.push('Status', {
                                name: data.name,
                                image: data.image,
                            })
                        }>
                        <View
                            style={{
                                flexDirection: 'column',
                                paddingHorizontal: 8,
                                position: 'relative',
                            }}>
                            {data.id == 1 ? (
                                <View
                                    style={{
                                        position: 'absolute',
                                        bottom: 15,
                                        right: 10,
                                        zIndex: 1,
                                    }}>
                                    <Entypo
                                        name="circle-with-plus"
                                        style={{
                                            fontSize: 20,
                                            color: '#405de6',
                                            backgroundColor: 'white',
                                            borderRadius: 10,
                                            overflow: 'hidden'
                                        }}
                                    />
                                </View>
                            ) : null}
                            <View
                                style={{
                                    width: 68,
                                    height: 68,
                                    backgroundColor: 'white',
                                    borderWidth: 1.8,
                                    borderRadius: 100,
                                    borderColor: '#c13584',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Image
                                    source={{ uri: data.image }} 
                                    style={{
                                        resizeMode: 'cover',
                                        width: '92%',
                                        height: '92%',
                                        borderRadius: 100,
                                        backgroundColor: 'orange',
                                    }}
                                />
                            </View>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: 20,
                                    color: 'black',
                                    opacity: data.id == 0 ? 1 : 0.7,
                                }}>
                                {data.name}
                            </Text>

                        </View>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
};

export default Stories;