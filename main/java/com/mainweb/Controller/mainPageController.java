package com.mainweb.Controller;

import com.mainweb.DTO.classificationData;
import com.mainweb.API.GetAiDataAPI;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

/**
 * 저자: 한승헌
 * 기능: MainPage Mapping
 *
 * ※ 현재 AI 서버 미구현으로 인해 GetAIService 구현 부분 수정이 필요함
 * */
@Controller
@RequiredArgsConstructor
@Log4j2
public class mainPageController {
    private List<classificationData> list;
    private final GetAiDataAPI getAiDataService;
    @GetMapping("/result")
    public String getResult(Model model) throws ServletException {

        // S3에 저장된 파일의 ID를 불러온다.
        String fileUrl = model.getAttribute("fileId").toString();
        log.info("[File Url] : "+fileUrl);
        model.addAttribute("filePath",fileUrl);

        // AI 서버로 부터 판독 결과 불러옴
        try {
            list = getAiDataService.getData(fileUrl);
            model.addAttribute("classificationData", list);
        }catch (Exception e){
            log.error(e.getMessage());
            throw new ServletException("Fail to Fetch Data From AI Server!");
        }

        //result Page로 리다이렉트
        return "result";
    }

    @GetMapping("/main")
    public String getMain(HttpServletRequest request, HttpServletResponse response){
        return "main";
    }
}
