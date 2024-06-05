package com.mainweb.Service;

import com.mainweb.DTO.BoardDto;
import com.mainweb.entity.Board;
import com.mainweb.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    @Value("{file.path}")
    private String uploadFolder;
    public void write(BoardDto boardDto) {
        Board dbWriteBoard = Board.builder()
                .content(boardDto.getContent())
                .build();
        log.info("db == {}" , boardDto.getContent());
        boardRepository.save(dbWriteBoard);
    }
    public void upload(MultipartFile multipartFile) throws IOException {
        String originalFileName = multipartFile.getOriginalFilename();
        if (originalFileName == null || originalFileName.isEmpty()) {
            throw new IOException("유효하지 않은 파일 이름입니다.");
        }

        UUID convertedId = UUID.randomUUID();
        String imageFileName = convertedId + "_" + originalFileName;
        Path imageFilePath = Paths.get(uploadFolder, imageFileName);

        // 파일을 지정된 위치로 전송
        multipartFile.transferTo(imageFilePath.toFile());

        // 파일 업로드 경로를 로그로 출력
        System.out.println("파일이 업로드되었습니다: " + imageFilePath.toString());

    }
}
