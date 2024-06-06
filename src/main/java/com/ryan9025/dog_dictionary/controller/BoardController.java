package com.ryan9025.dog_dictionary.controller;

import com.ryan9025.dog_dictionary.dto.BoardDto;
import com.ryan9025.dog_dictionary.dto.CustomUserDetails;
import com.ryan9025.dog_dictionary.entity.Board;
import com.ryan9025.dog_dictionary.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
@RequestMapping("/board")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;
    @GetMapping("/feed")
    public String feed() {
        return "/board/feed";
    }

    @GetMapping("/upload")
    public String upload(Model model) {
        model.addAttribute("boardDto",new BoardDto());
        return "/board/upload";
    }
    @PostMapping("/upload")
    public String uploadProcess(BoardDto boardDto, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        boardService.upload(boardDto,customUserDetails);
        return "/board/feed";
    }
    @GetMapping("/temp")
    public String temp() {
        return "/board/temp";
    }
}

