package com.ryan9025.dog_dictionary.controller;

import com.ryan9025.dog_dictionary.dto.auth.CustomUserDetails;
import com.ryan9025.dog_dictionary.dto.user.UserProfileDto;
import com.ryan9025.dog_dictionary.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @GetMapping("/myPage/{id}")
    public String myPage(@PathVariable Long id, Model model,
                         @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        UserProfileDto userInfo = userService.getProfile(id, customUserDetails.getLoggedUser().getId());
        model.addAttribute("userInfo",userInfo);
        return "/user/myPage";
    }
}
