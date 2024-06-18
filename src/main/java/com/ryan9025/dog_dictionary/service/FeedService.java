package com.ryan9025.dog_dictionary.service;

import com.ryan9025.dog_dictionary.dto.feed.FeedDto;
import com.ryan9025.dog_dictionary.dto.auth.CustomUserDetails;
import com.ryan9025.dog_dictionary.dto.feed.ImageUploadDto;
import com.ryan9025.dog_dictionary.entity.Feed;
import com.ryan9025.dog_dictionary.repository.FeedRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class FeedService {
    private final FeedRepository feedRepository;
    // 이미지가 저장되는 로컬 경로
    @Value("${file.path}")
    private String uploadFolder;

    public void upload(ImageUploadDto imageUploadDto, CustomUserDetails customUserDetails) {
        String originalFileName = imageUploadDto.getFile().getOriginalFilename();
        // 이미지 이름 중복 방지를 위해 UUID 생성해서 파일명에 추가하는 코드
        UUID uuid = UUID.randomUUID();
        String imageFileName = uuid + "_" + originalFileName;

        Path imageFilePath = Paths.get(uploadFolder + imageFileName);

        try {
            Files.write(imageFilePath, imageUploadDto.getFile().getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        Feed feed = imageUploadDto.toEntity(imageFileName, imageUploadDto.getContent(), customUserDetails.getLoggedUser());
        feedRepository.save(feed);

    }
    public Feed loadSingleFeed(Long id) {
        return feedRepository.findById(id).orElseThrow();
    }
    public Page<Feed> loadFeeds(Long customDetailsId, Pageable pageable) {
        Page<Feed> feeds = feedRepository.feed(customDetailsId,pageable);
        feeds.forEach((feed)->{
            feed.setLikesTotal(feed.getLikes().size());  // arrayList
            feed.getLikes().forEach((like)->{
                // 152번 이미지 user 1,2,3
                if(Objects.equals(like.getUser().getId(), customDetailsId)) {
                    feed.setLikesState(true);
                }
                log.info(feed.toString());
            });
        });
        return feeds;
    }

    @Transactional(readOnly = true)
    public List<Feed> popularFeeds() {
        return feedRepository.popularFeeds();
    }
}
