package com.ryan9025.dog_dictionary.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ryan9025.dog_dictionary.constant.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@EntityListeners(AuditingEntityListener.class)
public class User {
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
    private String role;

    // 양방향 매핑

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY) // 원래는 column 생성하지만, User entity 포함되는 속성이 아니면 생성 x
    @JsonIgnoreProperties({"user"})
    private List<Feed> feedList;

    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime modifiedDate;
}