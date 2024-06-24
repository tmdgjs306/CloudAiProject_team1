package com.ryan9025.dog_dictionary.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Authentication {
    @Id
    private Long id; // pk

    private String randomCode; // 인증번호
    private String userEmail; // 유저 이메일

    @ManyToOne
    private User user;
}
