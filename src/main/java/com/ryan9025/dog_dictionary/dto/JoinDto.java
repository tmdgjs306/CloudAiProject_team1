package com.ryan9025.dog_dictionary.dto;

import com.ryan9025.dog_dictionary.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JoinDto {
    private String userId;
    private String password;
    private String nickname;
    private String tel;
    private String email;

    public static JoinDto fromEntity(User user) {
        return JoinDto.builder()
                .userId(user.getUserId())
                .password(user.getPassword())
                .nickname(user.getNickname())
                .tel(user.getTel())
                .email(user.getEmail())
                .build();
    }
}
