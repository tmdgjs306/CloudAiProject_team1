package com.ryan9025.dog_dictionary.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Authentication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // pk

    private String randomCode; // 인증번호
    private String userEmail; // 유저 이메일

    @ManyToOne
    private User user;
}
