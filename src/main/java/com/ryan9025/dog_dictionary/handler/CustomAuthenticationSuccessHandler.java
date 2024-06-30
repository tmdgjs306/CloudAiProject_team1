package com.ryan9025.dog_dictionary.handler;

import com.ryan9025.dog_dictionary.dto.CustomUserDetails;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        // CustomUserDetails 에서 로그인한 사용자 정보 중 가져오고 싶은 값을 설정
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Long id = userDetails.getLoggedUser().getId();

        // 리디렉션 URL 생성
        String redirectUrl = "/user/myPage/" + id;

        // 리디렉션 수행
        response.sendRedirect(redirectUrl);
    }
}
