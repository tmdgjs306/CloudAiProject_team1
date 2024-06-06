package com.ryan9025.dog_dictionary.service;

import com.ryan9025.dog_dictionary.dto.BoardDto;
import com.ryan9025.dog_dictionary.dto.CustomUserDetails;
import com.ryan9025.dog_dictionary.entity.Board;
import com.ryan9025.dog_dictionary.repository.BoardRepository;
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
public class BoardService {
    private final BoardRepository boardRepository;
    // 이미지가 저장되는 로컬 경로
    @Value("${file.path}")
    private String uploadFolder;

    public void upload(BoardDto boardDto, CustomUserDetails customUserDetails) {
        String originalFileName = boardDto.getFile().getOriginalFilename();
        // 이미지 이름 중복 방지를 위해 UUID 생성해서 파일명에 추가하는 코드
        UUID uuid =UUID.randomUUID();
        String imageFileName = uuid + "_" + originalFileName;

        Path imageFilePath = Paths.get(uploadFolder + imageFileName);

        try {
            Files.write(imageFilePath,boardDto.getFile().getBytes());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        Board board = boardDto.toEntity(imageFileName,customUserDetails.getLoggedMember());
        boardRepository.save(board);


    }
}
