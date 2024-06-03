package com.mainweb.Controller;

import com.mainweb.DTO.classificationData;
import com.mainweb.Service.GetAiDataService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

/**
 * 저자: 한승헌
 * 기능: MainPage Mapping
 *
 * ※ 현재 AI 서버 미구현으로 인해 GetAIService 구현 부분 수정이 필요함
 * */
@Controller
@RequiredArgsConstructor
public class mainPageController {
    private List<classificationData> list;
    private final GetAiDataService getAiDataService;
    @GetMapping("/result")
    public String getResult(HttpServletResponse response, HttpServletRequest request, Model model){

        // AI 서버로 부터 판독 결과 불러옴
        String fileUrl = model.getAttribute("fileId").toString();
        System.out.println("[File Url:]: "+fileUrl);

        list = getAiDataService.getData(fileUrl);
        model.addAttribute("classificationData",list);

        //result Page로 리다이렉트
        return "result";
    }
}
