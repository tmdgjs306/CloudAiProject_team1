package com.ryan9025.dog_dictionary.controller;

import com.ryan9025.dog_dictionary.dto.JoinDto;
import com.ryan9025.dog_dictionary.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    @GetMapping("/join")
    public String join(Model model) {
        model.addAttribute("joinDto",new JoinDto());
        return "/user/join";
    }
    @PostMapping("/join")
    public String joinProcess(@ModelAttribute JoinDto joinDto) {
        userService.join(joinDto);
        return "redirect:/auth/login";
    }
}
