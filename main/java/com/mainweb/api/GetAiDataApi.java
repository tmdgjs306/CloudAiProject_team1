package com.mainweb.api;

import com.mainweb.dto.ClassificationData;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor

public class GetAiDataApi {
    private List<ClassificationData> list;

    // AI 서버 구현 후 변경 예정
    // 현재는 VIew Test를 위해 고정된 값을 넣어 리턴함 -> AI 서버 구현 후 변경 예정
    public List<ClassificationData> getData(String fileUrl){
        list = new ArrayList<>();
        for(int i=0; i<3; i++) {
            int temp = (int) (Math.random() * 100);
            ClassificationData testData = new ClassificationData();
            testData.setName("name1");
            testData.setValue(temp);
            list.add(testData);
        }
        return list;
   }
}
