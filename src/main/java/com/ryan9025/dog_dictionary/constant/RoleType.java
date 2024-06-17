package com.ryan9025.dog_dictionary.constant;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@RequiredArgsConstructor
@ToString
public enum RoleType {
    ADMIN("ROLE_ADMIN"), // 관리자 권한을 받을 ROLE
    USER("ROLE_USER"); // 회원 가입시, 기본적으로 부여되는 ROLE

    private final String role; // DB에 저장할 때
}
