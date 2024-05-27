package com.mainweb.Controller;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.mainweb.Service.S3UploadService;
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

/*
 * 저자: 한승헌
 * 기능: AWS S3에 이미지 업로드
 *
 * */

@Controller
@RequiredArgsConstructor
@RequestMapping("/upload")
public class imageUploadController {

    private final S3UploadService s3UploadService;

    @PostMapping("/S3_image")
    public String uploadFile(Model model, @RequestParam("file")MultipartFile file){
        String fileUrl = "";
        try {
            fileUrl = s3UploadService.uploadImageToS3(file);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        model.addAttribute("filePath", fileUrl);
        return "index";
    }
}
