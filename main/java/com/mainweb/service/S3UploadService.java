package com.mainweb.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

/*
* 작성자: 한승헌
* 기능: S3 파일 업로드 및 삭제
* 테스트 이후 로컬에 저장 후 올리는 부분 삭제 예정..
* 마지막 수정일 : 2024.05.27
* */
@Component
@Slf4j
@Log4j2
public class S3UploadService {

    /*
     * 함수 기능: S3에 이미지 업로드
     * 로직:  S3에 이미지 업로드 -> 주소 반환
     * 매개변수: multipartFile : 사용자로 부터 입력받은 파일
     *
     * 한글 파일명 꺠짐 ->  파일명 변경 필요 -> 해결
     * 최종 수정일 : 2024.05.27
     */

    @Autowired
    private AmazonS3Client amazonS3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.website.address}")
    private String awsAddress;

    public String uploadImageToS3(MultipartFile file) throws IOException {
        try {

            // 파일명이 한글인 이미지 파일 업로드 시 문제 발생 -> 랜덤으로 파일명 새로 생성
            String fileName= String.valueOf(UUID.randomUUID());
            // AWS 내에 저장된 객체의 주소
            String fileUrl= awsAddress+fileName;

            //파일에 대한 메타 데이터 생성
            ObjectMetadata metadata= new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());

            //파일 업로드
            amazonS3Client.putObject(bucket,fileName,file.getInputStream(),metadata);

            log.info("[File Upload] : Success!\"+\"\\n\"+\"url: \"+fileUrl");
            // 주소 반환
            return fileUrl;

        } catch (IOException e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }
}


