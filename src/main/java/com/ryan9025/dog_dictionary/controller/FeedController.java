package com.ryan9025.dog_dictionary.controller;

import com.ryan9025.dog_dictionary.dto.auth.CustomUserDetails;
import com.ryan9025.dog_dictionary.dto.feed.ImageUploadDto;
import com.ryan9025.dog_dictionary.entity.Feed;
import com.ryan9025.dog_dictionary.service.FeedService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/feed")
@RequiredArgsConstructor
@Slf4j
public class FeedController {
    private final FeedService feedService;
    @GetMapping("/feedList")
    public String feed(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
                       Model model) {
        model.addAttribute("loggedUserId", customUserDetails.getLoggedUser().getId());
        return "/feed/feedList";
    }

    @GetMapping("/upload")
    public String upload(Model model) {
        model.addAttribute("imageUploadDto",new ImageUploadDto());
        return "/feed/upload";
    }
    @PostMapping("/upload")
    public String uploadProcess(ImageUploadDto imageUploadDto, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        feedService.upload(imageUploadDto,customUserDetails);
        return "redirect:/user/myPage/" + customUserDetails.getLoggedUser().getId();
    }
    @GetMapping("/singleFeed/{id}")
    public String singleFeed(@PathVariable Long id, Model model) {
        Feed getFeedInfo = feedService.loadSingleFeed(id);
        model.addAttribute("getFeedInfo", getFeedInfo);
        log.info("getFeedInfo=={}",getFeedInfo);
        return "/feed/singleFeed";
    }
}

