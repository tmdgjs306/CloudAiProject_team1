package com.ryan9025.dog_dictionary.controller;

import com.ryan9025.dog_dictionary.dto.auth.JoinDto;
import com.ryan9025.dog_dictionary.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    @GetMapping("/login")
    public String login(@RequestParam(value = "error",required = false) String error, // error 메세지
                        @RequestParam(value = "exception",required = false) String exception, // exception 종류
                        Model model){
        model.addAttribute("error",error);
        model.addAttribute("exception",exception);
        return "/auth/login";
    }
    @GetMapping("/join")
    public String join(Model model) {
        model.addAttribute("joinDto",new JoinDto());
        return "/auth/join";
    }
    @PostMapping("/join")
    public String joinProcess(@Valid @ModelAttribute JoinDto joinDto,
                              BindingResult bindingResult,
                              Model model) {
        if(bindingResult.hasErrors()) {
            model.addAttribute("joinDto",joinDto);
            return "/auth/join";
        }
        authService.join(joinDto);
        return "redirect:/auth/login";
    }
    @GetMapping("/idCheck")
    @ResponseBody
    public int idCheck(String duplicatedId) { // duplicatedId --> 사용자로부터 입력받은 값
        if(duplicatedId == null || duplicatedId.isEmpty()) {
            return -1;
        }
        return authService.idCheck(duplicatedId);

    }
    @GetMapping("/emailCheck")
    @ResponseBody
    public int emailCheck(String duplicatedEmail) { // duplicatedEmail --> 사용자로부터 입력받은 값
        if(duplicatedEmail == null || duplicatedEmail.isEmpty()) {
            return -1;
        }
        return authService.emailCheck(duplicatedEmail);

    }
}
