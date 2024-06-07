package com.mung.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.mung.service.UserService;
import com.mung.model.User;

@Controller
public class LoginController {
    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @PostMapping("/login")
    public String login(@RequestParam("username") String username,
                        @RequestParam("password") String password,
                        Model model) {
        User user = userService.findByUsername(username);
        if (user != null && userService.checkPassword(password, user.getPassword())) {
            // 성공적인 로그인
            return "redirect:/welcome";
        } else {
            // 로그인 실패
            model.addAttribute("error", "Invalid username or password");
            return "login";
        }
    }
}
