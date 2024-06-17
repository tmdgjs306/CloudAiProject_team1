package com.ryan9025.dog_dictionary.dto.auth;

import com.ryan9025.dog_dictionary.constant.RoleType;
import com.ryan9025.dog_dictionary.entity.User;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JoinDto {

    private Long id;

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

    @Enumerated(EnumType.STRING)
    private RoleType role;

    private Timestamp createdDate;

    public User toEntity() {
        return User.builder()
                .userId(userId)
                .password(password)
                .nickname(nickname)
                .email(email)
                .tel(tel)
                .role(role)
                .build();
    }
}
