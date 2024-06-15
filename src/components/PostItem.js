import { View, Text, Image} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

// Feed Post 양식 
const PostItem = ({data}) => {
  return (
    <View
        style={{
            paddingBottom: 10,
            borderBottomColor: 'gray',
            borderBottomWidth: 0.1,
        }}
    >
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 15
            }}
        >
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <Image
                source={data.postPersonImage}
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                }}
            ></Image>
            <View style={{ paddingLeft: 8}}>
                <Text style={{fontSize: 15, fontWeight: 'bold', color:'black'}}>
                    {data.postTitle}
                </Text>
            </View>
        </View>
            <Feather name='more-vertical' style={{fontSize: 20}}/>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                <Image
                    source={data.postImage}
                    style={{ width: '100%', height: 400}}
                />
            </View>
    </View>
  )
}

export default PostItem