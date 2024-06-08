package com.ryan9025.dog_dictionary.controller;

import com.ryan9025.dog_dictionary.dto.CustomUserDetails;
import com.ryan9025.dog_dictionary.dto.JoinDto;
import com.ryan9025.dog_dictionary.dto.UserProfileDto;
import com.ryan9025.dog_dictionary.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

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
    public String joinProcess(@Valid @ModelAttribute JoinDto joinDto,
                              BindingResult bindingResult,
                              Model model) {
        if(bindingResult.hasErrors()) {
            model.addAttribute("joinDto",joinDto);
            return "/user/join";
        }
        userService.join(joinDto);
        return "redirect:/auth/login";
    }
    @GetMapping("/myPage/{id}")
    public String myPage(@PathVariable Long id, Model model,
                         @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        UserProfileDto userInfo = userService.getProfile(id, Math.toIntExact(customUserDetails.getLoggedUser().getId()));
        model.addAttribute("userInfo",userInfo);
        return "/user/myPage";
    }
}
