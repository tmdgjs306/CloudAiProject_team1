package com.ryan9025.dog_dictionary.config;

import com.ryan9025.dog_dictionary.handler.CustomAuthenticationSuccessHandler;
import com.ryan9025.dog_dictionary.handler.CustomLoginFailureHandler;
import com.ryan9025.dog_dictionary.service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import java.util.UUID;

@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig {
    private final CustomLoginFailureHandler customLoginFailureHandler;
    private final CustomUserDetailsService customUserDetailsService;
    private final CustomAuthenticationSuccessHandler authenticationSuccessHandler;
    /* 1. Security 이용해 로그인/로그아웃 기능 구현
     * 2. 기본적인 setting 및 csrf.disable 설정
     * 3. CustomLoginFailureHandler 추가
     * 4. rememberMe 토큰 설정 -> 로그인 정보 유지
     * 5. CustomAuthenticationSuccessHandler 추가 -> @PathVariable 값을 받아올 수 있게 redirectUrl 커스터마이징 하는 핸들러
     * 6. 최종 수정일: 2024.06.10 */
    @Bean
    public SecurityFilterChain filterChain (HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers("/css/**","/js/**","/images/**","/feed/**","/user/**","/auth/**")
                        .permitAll()
                        .requestMatchers("/admin/**").hasRole("ADMIN") // ADMIN 접근 가능
                        .anyRequest()
                        .authenticated())
                .formLogin((form) -> form
                        .loginPage("/auth/login")
                        .usernameParameter("userId")
                        .passwordParameter("password")
                        .loginProcessingUrl("/auth/login")
                        .failureHandler(customLoginFailureHandler) // 로그인 실패 핸들러
                        .successHandler(authenticationSuccessHandler) // @PathVariable 값을 받아올 수 있는 핸들러
                        .permitAll())
                .logout((logout) -> logout
                        .logoutRequestMatcher(new AntPathRequestMatcher("/auth/logout"))
                        .logoutSuccessUrl("/auth/login")
                        .invalidateHttpSession(true) // 로그아웃 할 때, 세션 종료
                        .deleteCookies("JSESSIONID") // 로그아웃 할 때. JSESSIONID 쿠키 제거
                        .clearAuthentication(true)) // 로그아웃 할 때, 권한 제거
                .rememberMe((auth) -> auth
                        .rememberMeParameter("rememberUser") // 토큰명
                        .key(UUID.randomUUID().toString()) // 토큰 식별 KEY
                        .userDetailsService(customUserDetailsService) // 토큰에 저장 할 로그인 정보
                        .tokenValiditySeconds(60*60*24)) // 토큰 유지시간 24H으로 설정
                .csrf((csrf) -> csrf.disable());
        return httpSecurity.build();

    }
}
