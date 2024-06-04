package com.ryan9025.dog_dictionary.dto;

import com.ryan9025.dog_dictionary.entity.Board;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoardDto {
    private Long id;
    private String content;
    private MultipartFile file;

}
