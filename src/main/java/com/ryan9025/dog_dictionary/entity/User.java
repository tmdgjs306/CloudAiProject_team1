package com.ryan9025.dog_dictionary.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ryan9025.dog_dictionary.BaseTimeEntity;
import com.ryan9025.dog_dictionary.constant.RoleType;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data // @Getter, @Setter, @RequiredArgsConstructor,
// @ToString 을 한번에 설정해주는 어노테이션
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class User extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String userId;

    @Column(nullable = false)
    private String password;

    private String nickname;
    private String tel;

    @Column(nullable = false, unique = true) // 이메일로 아이디/비밀번호 찾기 -> 중복 x
    private String email;

    private String profileImageUrl;
    private String intro;

    @Enumerated(EnumType.STRING)
    private RoleType role;


    @JsonIgnoreProperties({"user"})
    @OneToMany(mappedBy = "user")
    private List<Feed> feedList;

}