package com.mainweb.Controller;

import com.mainweb.DTO.classificationData;
import com.mainweb.Service.S3UploadService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/** 저자: 한승헌
 * 기능: AWS S3에 이미지 업로드 후 FileId 반환
 *
 * */

@Controller
@RequiredArgsConstructor
@RequestMapping("/upload")
public class imageUploadController {

    private final S3UploadService s3UploadService;
    private List<classificationData> list;
    @PostMapping("/S3_image")
    public String uploadFile(RedirectAttributes redirectAttributes,HttpServletResponse response, Model model, @RequestParam("file")MultipartFile file) throws IOException {
        String fileUrl = "";
        String staticFileUrl = "https://cloudeai.s3.ap-northeast-2.amazonaws.com/185d3f1a-82eb-4ba3-ad90-f4aff613bc12";

        // 이미지 서버에 파일 업로드
        try {
            fileUrl = s3UploadService.uploadImageToS3(file);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        model.addAttribute("filePath", fileUrl);
        //model.addAttribute("filePath",staticFileUrl);

        // Result Page로 이동 (Result Page에 fileId 값으로 경로 전달)

        redirectAttributes.addFlashAttribute("fileId",fileUrl);
        return "redirect:/result";
    }
}
