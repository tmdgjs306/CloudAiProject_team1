package com.ryan9025.dog_dictionary.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    @GetMapping("/login")
    public String login(@RequestParam(value = "error",required = false) String error, // error 메세지
                        @RequestParam(value = "exception",required = false) String exception, // exception 종류
                        Model model){
        model.addAttribute("error",error);
        model.addAttribute("exception",exception);
        return "/auth/login";
    }
}
