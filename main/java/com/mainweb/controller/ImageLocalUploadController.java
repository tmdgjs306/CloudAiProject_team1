package com.mainweb.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Controller
@RequiredArgsConstructor
@RequestMapping("/upload")
public class ImageLocalUploadController {
    /**  저자: 한승헌
    *  용도: 로걸환경 테스트
    *  #배포시 제거
    * */
    private int imageId =1;
    @PostMapping("/local")
    public String postImg(Model model, @RequestParam MultipartFile file) throws IOException {

        String fileDir = "C:\\Study Spring\\FindDogMain\\MainWeb\\src\\main\\resources\\image\\";

        // 파일 전송 (추후 인공지능 서버 구현 시 변경 예정)
        file.transferTo(new File(fileDir + Integer.toString(imageId)+file.getOriginalFilename()));
        String filePath = "localhost:8080/resources/image/"+Integer.toString(imageId)+file.getOriginalFilename();
        imageId++;

        model.addAttribute("filePath",filePath);
        //다시 MainPage로 리다이렉트
        return "index";
    }


}
