package com.ryan9025.dog_dictionary.service;

import com.ryan9025.dog_dictionary.dto.FeedDto;
import com.ryan9025.dog_dictionary.dto.CustomUserDetails;
import com.ryan9025.dog_dictionary.entity.Feed;
import com.ryan9025.dog_dictionary.repository.FeedRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class FeedService {
    private final FeedRepository feedRepository;
    // 이미지가 저장되는 로컬 경로
    @Value("${file.path}")
    private String uploadFolder;

    public void upload(FeedDto feedDto, CustomUserDetails customUserDetails) {
        String originalFileName = feedDto.getFile().getOriginalFilename();
        // 이미지 이름 중복 방지를 위해 UUID 생성해서 파일명에 추가하는 코드
        UUID uuid = UUID.randomUUID();
        String imageFileName = uuid + "_" + originalFileName;

        Path imageFilePath = Paths.get(uploadFolder + imageFileName);

        try {
            Files.write(imageFilePath, feedDto.getFile().getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        Feed feed = feedDto.toEntity(imageFileName, customUserDetails.getLoggedMember());
        feedRepository.save(feed);

    }
    public Feed loadSingleFeed(Long id) {
        Feed feedInfo = feedRepository.findById(id).orElseThrow();
        log.info("boardInfo=={}", feedInfo);
        return feedInfo;
    }
}
