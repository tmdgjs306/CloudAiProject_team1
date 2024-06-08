package com.ryan9025.dog_dictionary.service;

import com.ryan9025.dog_dictionary.dto.CustomUserDetails;
import com.ryan9025.dog_dictionary.entity.User;
import com.ryan9025.dog_dictionary.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    // username 이 DB에 존재하는지 확인
    // username -> userId ( SecurityConfig 에서 userParameter 설정 한 값 )
    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        Optional<User> loggedUser = userRepository.findByUserId(userId);
        if(loggedUser.isPresent()) {
            return new CustomUserDetails(loggedUser.get());
        }
        throw new UsernameNotFoundException("아이디와 비밀번호를 확인 후 다시 시도해 주세요.");
    }
}
