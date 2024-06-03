package com.mainweb.Controller;

import com.mainweb.DTO.classificationData;
import com.mainweb.Service.GetAIDataService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class mainPageController {
    private List<classificationData> list;
    private final GetAIDataService getAIDataService;
    @GetMapping("/result")
    public String getResult(HttpServletResponse response, HttpServletRequest request, Model model){

        // AI 서버로 부터 판독 결과 불러옴
        list = getAIDataService.getData();
        model.addAttribute("classificationData",list);
        return "result";
    }
}
