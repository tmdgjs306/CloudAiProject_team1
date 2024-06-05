package com.ryan9025.dog_dictionary.config;

import com.ryan9025.dog_dictionary.handler.CustomLoginFailureHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {
    private final CustomLoginFailureHandler customLoginFailureHandler;
    /* 1. Security 이용해 로그인/로그아웃 기능 구현
     * 2. 기본적인 setting 및 csrf.disable 설정
     * 3. CustomLoginFailureHandler 추가
     * 4. 최종 수정일: 2024.06.05 */
    @Bean
    public SecurityFilterChain filterChain (HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers("/css/**","/js/**","/images/**","/board/**","/user/**","/auth/**")
                        .permitAll()
                        .requestMatchers("/admin/**").hasRole("ADMIN") // ADMIN 접근 가능
                        .anyRequest()
                        .authenticated())
                .formLogin((form) -> form
                        .loginPage("/auth/login")
                        .usernameParameter("userId")
                        .passwordParameter("password")
                        .loginProcessingUrl("/auth/login")
                        .failureHandler(customLoginFailureHandler)
                        .defaultSuccessUrl("/board/feed",true)
                        .permitAll())
                .csrf((csrf) -> csrf.disable());
        return httpSecurity.build();

    }
}
