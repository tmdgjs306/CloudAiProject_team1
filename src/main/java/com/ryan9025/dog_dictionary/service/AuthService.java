package com.ryan9025.dog_dictionary.service;

import com.ryan9025.dog_dictionary.constant.RoleType;
import com.ryan9025.dog_dictionary.dto.auth.JoinDto;
import com.ryan9025.dog_dictionary.entity.User;
import com.ryan9025.dog_dictionary.repository.UserRepository;
import groovy.util.logging.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserRepository userRepository;

    public User join(JoinDto joinDto) {
        User dbJoinMember = User.builder()
                .userId(joinDto.getUserId())
                .password(bCryptPasswordEncoder.encode(joinDto.getPassword()))
                .nickname(joinDto.getNickname())
                .email(joinDto.getEmail())
                .tel(joinDto.getTel())
                .role(RoleType.USER)
                .build();
        return userRepository.save(dbJoinMember);
    }

    public int idCheck(String userId) {
        Optional<User> optionalUser = userRepository.findByUserId(userId);
        if (optionalUser.isEmpty()) {
            return 0;
        }
        return 1;
    }
    public int emailCheck(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return 0;
        }
        return 1;
    }

}
