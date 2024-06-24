package com.ryan9025.dog_dictionary.controller;

import com.ryan9025.dog_dictionary.dto.auth.JoinDto;
import com.ryan9025.dog_dictionary.service.AuthService;
import com.ryan9025.dog_dictionary.service.MailService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@Controller
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final AuthService authService;
    private final MailService mailService;

    /* --------------- 로그인 ---------------- */
    @GetMapping("/login")
    public String login(@RequestParam(value = "error",required = false) String error, // error 메세지
                        @RequestParam(value = "exception",required = false) String exception, // exception 종류
                        Model model){
        model.addAttribute("error",error);
        model.addAttribute("exception",exception);
        return "/auth/login";
    }
    /* --------------- 회원 가입 페이지 ---------------- */
    @GetMapping("/join")
    public String join(Model model) {
        model.addAttribute("joinDto",new JoinDto());
        return "/auth/join";
    }
    /* --------------- 회원 가입 프로세스 ---------------- */
    @PostMapping("/join")
    public String joinProcess(@Valid @ModelAttribute JoinDto joinDto,
                              BindingResult bindingResult,
                              Model model) {
        if(bindingResult.hasErrors()) {
            model.addAttribute("joinDto",joinDto);
            return "/auth/join";
        }
        authService.join(joinDto);
        log.info(String.valueOf(joinDto));
        return "redirect:/auth/login";
    }
    @ModelAttribute("size")
    public Map<String,String> size () {
        Map<String,String> size = new LinkedHashMap<>();
        size.put("SMALL","소형견");
        size.put("MEDIUM","중형견");
        size.put("LARGE","대형견");
        return size;
    }
    /* --------------- 프로필 이미지  ---------------- */

    /* --------------- 아이디 중복체크 ---------------- */
    @GetMapping("/idCheck")
    @ResponseBody
    public int idCheck(String duplicatedId) { // duplicatedId --> 사용자로부터 입력받은 값
        if(duplicatedId == null || duplicatedId.isEmpty()) {
            return -1;
        }
        return authService.idCheck(duplicatedId);

    }
    /* --------------- 이메일 중복체크 ---------------- */
    @GetMapping("/emailCheck")
    @ResponseBody
    public int emailCheck(String duplicatedEmail) { // duplicatedEmail --> 사용자로부터 입력받은 값
        if(duplicatedEmail == null || duplicatedEmail.isEmpty()) {
            return -1;
        }
        return authService.emailCheck(duplicatedEmail);
    }
    /* --------------- 아이디 찾기 ---------------- */
    @GetMapping("/findUserId")
    public String findUserId() {
        return "/auth/findUserId";
    }

    /* --------------- 이메일 인증번호 확인 ---------------- */
    @GetMapping("/confirmEmailAuthNum")
    @ResponseBody
    public int authenticatedByEmail(String userEmail) throws MessagingException {
        // 입력한 값이 db에 있는지 확인
        if (userEmail == null || userEmail.isEmpty()) {
            return -1;
        } else {
            log.info("userEmail==={}",userEmail);
            int returnValue = authService.emailCheck(userEmail);
            if (returnValue == 1) {
                mailService.sendAuthMail(userEmail);
            } else {
                return 0;
            }
        }
        return 1;
    }
}
