package com.example.mung;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class MungJunmoApplication {

    public static void main(String[] args) {
        SpringApplication.run(MungJunmoApplication.class, args);
    }
}

@Controller
class HelloWorldController {

    @GetMapping("/")
    public String helloWorld(Model model) {
        model.addAttribute("message", "Hello World");
        return "hello";  // hello.html이라는 이름의 템플릿을 반환
    }

    @GetMapping("/login")
    public String login(Model model) {
        // model.addAttribute("message", "Hello World");
        return "login";  // login.html이라는 이름의 템플릿을 반환
    }

    @GetMapping("/joinup")
    public String joinup(Model model) {
        // model.addAttribute("message", "Hello World");
        return "joinup";  // joinup.html이라는 이름의 템플릿을 반환
    }

}
