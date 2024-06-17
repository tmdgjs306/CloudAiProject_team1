package com.ryan9025.dog_dictionary.dto.feed;

import com.ryan9025.dog_dictionary.entity.Feed;
import com.ryan9025.dog_dictionary.entity.User;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedDto {
    private String content;
    private MultipartFile file;

    public Feed toEntity(String imageUrl, User user) {
        return Feed.builder()
                .imageUrl(imageUrl)
                .content(content)
                .user(user)
                .build();
    }
}
