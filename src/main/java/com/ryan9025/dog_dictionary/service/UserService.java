package com.ryan9025.dog_dictionary.service;

import com.ryan9025.dog_dictionary.constant.Role;
import com.ryan9025.dog_dictionary.dto.JoinDto;
import com.ryan9025.dog_dictionary.entity.User;
import com.ryan9025.dog_dictionary.repository.UserRepository;
import groovy.util.logging.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;

    public User join(JoinDto joinDto) {
        User dbJoinUser = User.builder()
                .userId(joinDto.getUserId())
                .password(joinDto.getPassword())
                .nickname(joinDto.getNickname())
                .tel(joinDto.getTel())
                .email(joinDto.getEmail())
                .role(Role.USER.getRole())
                .build();
        return userRepository.save(dbJoinUser);
    }
}
