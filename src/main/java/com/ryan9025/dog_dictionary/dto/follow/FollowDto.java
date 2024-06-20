package com.ryan9025.dog_dictionary.dto.follow;

import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
public class FollowDto {
    private Long id;
    private String profileImageUrl;
    private String nickname;
    private Character followState;
    private Character equalState;
}
