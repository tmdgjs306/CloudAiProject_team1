import { View, Text } from 'react-native'
import React, {useState} from 'react'
import axios from 'axios'


/**
 * 백엔드 서버에 이미지 업로드를 요청하는 기능 
 * 
 * 미구현 
 */
const imageUpload = async(photo:any, uid:string) =>  {
    var body = new FormData();
    const response = "";
    const serverUrl = 'http://127.0.0.1:8080/upload/image';
    body.append('file',photo);
    body.append('uid',uid);
    // 서버에게 전송
    const result = axios.post(serverUrl,body,{
        headers: {'content-type': 'multipart/form-data'}
    }).then(response=>response.data);
    console.log(response);
    return response;
}
export default imageUpload