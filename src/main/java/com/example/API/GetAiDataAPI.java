package com.mainweb.API;

import com.mainweb.DTO.classificationData;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor

public class GetAiDataAPI {
    private List<classificationData> list;

    // AI 서버 구현 후 변경 예정
    // 현재는 VIew Test를 위해 고정된 값을 넣어 리턴함 -> AI 서버 구현 후 변경 예정
    public List<classificationData> getData(String fileUrl){
        list = new ArrayList<>();
        for(int i=0; i<3; i++) {
            int temp = (int) (Math.random() * 100);
            classificationData testData = new classificationData();
            testData.setName("name1");
            testData.setValue(temp);
            list.add(testData);
        }
        return list;
   }
}
