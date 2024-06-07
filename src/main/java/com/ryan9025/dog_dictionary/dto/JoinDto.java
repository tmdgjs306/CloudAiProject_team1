package com.ryan9025.dog_dictionary.dto;

import com.ryan9025.dog_dictionary.entity.User;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JoinDto {
    @NotNull(message = "아이디는 필수 입력사항입니다.")
    @Size(min = 4, max = 10, message = "아이디는 4자 이상 10자 이하로 입력해주세요.")
    private String userId;

    @NotNull(message = "비밀번호는 필수 입력사항입니다.")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,20}$",
             message = "비밀번호는 영문,숫자,기호를 조합하여 8자 이상, 20자 이하로 입력해주세요.")
    private String password;

    @Size(max = 15, message = "닉네임은 최대 15자까지만 입력해주세요.")
    private String nickname;

    private String tel;

    @NotNull(message = "이메일은 필수 입력사항입니다.")
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
