package com.ryan9025.dog_dictionary.dto.follow;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FollowDto {
    private Long id;
    private String profileImageUrl;
    private String nickname;
    private Character followState;
    private Character equalState;

}
