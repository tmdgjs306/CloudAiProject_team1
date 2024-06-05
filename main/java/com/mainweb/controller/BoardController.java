package com.mainweb.controller;

import com.mainweb.dto.BoardDto;
import com.mainweb.service.BoardService;
import lombok.RequiredArgsConstructor;
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
    public String uploadProcess(@RequestParam("image") MultipartFile file, @ModelAttribute BoardDto boardDto, Model model) throws IOException {
        boardService.write(boardDto);
        boardService.upload(file);
        return "/board/feed";
    }
    @GetMapping("/temp")
    public String temp() {
        return "/board/temp";
    }
}

