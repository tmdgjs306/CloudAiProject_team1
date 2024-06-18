package com.ryan9025.dog_dictionary.dto.feed;

import com.ryan9025.dog_dictionary.entity.Feed;
import com.ryan9025.dog_dictionary.entity.Likes;
import com.ryan9025.dog_dictionary.entity.User;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedDto {
    private String imageUrl;
    private String content;
    private MultipartFile file;
    private List<Likes> likes;
    private int likesTotal;
    private boolean likesState;

    public Feed toEntity(String imageUrl, String caption, User user) {
        return Feed.builder()
                .imageUrl(imageUrl)
                .user(user)
                .build();
    }
}
