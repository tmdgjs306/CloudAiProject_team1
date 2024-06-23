package com.ryan9025.dog_dictionary.dto.user;

import com.ryan9025.dog_dictionary.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfileDto {
    private boolean pageOwner;
    private User user;
    private int imageTotal;
    private boolean followState;
    // 로그인한 사용자가 url 사용자를 팔로우하면  + 1
    private int followerCount;
    private int followingCount;
}
