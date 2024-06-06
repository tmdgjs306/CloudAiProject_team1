package com.ryan9025.dog_dictionary.dto;

import com.ryan9025.dog_dictionary.entity.Board;
import com.ryan9025.dog_dictionary.entity.User;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BoardDto {
    private String content;
    private MultipartFile file;

    public Board toEntity(String imageUrl, User user) {
        return Board.builder()
                .imageUrl(imageUrl)
                .content(content)
                .user(user)
                .build();
    }

}
