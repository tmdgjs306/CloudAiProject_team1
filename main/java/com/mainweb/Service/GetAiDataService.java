package com.mainweb.Service;

import com.mainweb.DTO.classificationData;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
@RequiredArgsConstructor

public class GetAiDataService {
    private final List<classificationData> list;

    // AI 서버 구현 후 변경 예정
    // 현재는 VIew Test를 위해 고정된 값을 넣어 리턴함 -> AI 서버 구현 후 변경 예정
    // 현재는 Controller에 구현되어 있으나, 나중에 Service 단으로 이동예정 (O)
    public List<classificationData> getData(String fileUrl){
       for(int i=0; i<3; i++) {
           int temp = (int) (Math.random() * 100);
           classificationData testData = new classificationData("name1", temp);
           list.add(testData);
       }
       return list;
   }
}
