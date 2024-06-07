package com.ryan9025.dog_dictionary.service;

import com.ryan9025.dog_dictionary.constant.Role;
import com.ryan9025.dog_dictionary.dto.JoinDto;
import com.ryan9025.dog_dictionary.entity.User;
import com.ryan9025.dog_dictionary.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final FollowRepository followRepository;

    public void join(JoinDto joinDto) {
        User dbJoinUser = User.builder()
                .userId(joinDto.getUserId())
                .password(bCryptPasswordEncoder.encode(joinDto.getPassword()))
                .nickname(joinDto.getNickname())
                .tel(joinDto.getTel())
                .email(joinDto.getEmail())
                .role(Role.USER.getRole())
                .build();
        userRepository.save(dbJoinUser);
    }
}
