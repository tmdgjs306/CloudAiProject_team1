package com.mainweb.Controller;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.mainweb.DTO.classificationData;
import com.mainweb.Service.S3UploadService;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/** 저자: 한승헌
 * 기능: AWS S3에 이미지 업로드
 *
 * */

@Controller
@RequiredArgsConstructor
@RequestMapping("/upload")
public class imageUploadController {

    private final S3UploadService s3UploadService;
    private List<classificationData> list;
    @PostMapping("/S3_image")
    public void uploadFile(HttpServletResponse response, Model model, @RequestParam("file")MultipartFile file) throws IOException {
        String fileUrl = "";
        String staticFileUrl = "https://cloudeai.s3.ap-northeast-2.amazonaws.com/185d3f1a-82eb-4ba3-ad90-f4aff613bc12";
        /*try {
            fileUrl = s3UploadService.uploadImageToS3(file);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        model.addAttribute("filePath", fileUrl);*/
        model.addAttribute("filePath",staticFileUrl);

        // AI 서버로 부터 판독 결과 불러옴
        // AI 서버 구현 후 변경 예정
        // 현재는 VIew Test를 위해 고정된 값을 넣어 리턴함
        // 현재는 Controller에 구현되어 있으나, 나중에 Service 단으로 이동예정
        response.setStatus(HttpServletResponse.SC_OK);
        response.sendRedirect("/result");
    }
}
