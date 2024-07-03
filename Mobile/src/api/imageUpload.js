import axios from 'axios';
import {SERVER_ADDRESS} from "@env";

const imageUpload = async(photo) =>  {
    console.log(photo);
    if (!photo) {
        console.log("photo 객체 또는 uri가 존재하지 않습니다.");
        return;
    }

    const formData = new FormData();
    formData.append('file', {
        uri: photo,
        type: 'image/jpeg',
        name: 'test.jpg',
    });

    try {
        const serverUrl = SERVER_ADDRESS+`/app/uploadImage`;
        const response = await axios.post(serverUrl, formData, {
            headers: {'Content-Type': 'multipart/form-data'},
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("이미지 업로드 중 오류 발생: ", error);
        return null;
    }
};

export default imageUpload;
