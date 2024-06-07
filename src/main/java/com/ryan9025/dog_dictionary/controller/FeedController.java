package com.ryan9025.dog_dictionary.controller;

import com.ryan9025.dog_dictionary.dto.FeedDto;
import com.ryan9025.dog_dictionary.dto.CustomUserDetails;
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
    public String feedList() {
        return "/feed/feedList";
    }

    @GetMapping("/upload")
    public String upload(Model model) {
        model.addAttribute("feedDto",new FeedDto());
        return "/feed/upload";
    }
    @PostMapping("/upload")
    public String uploadProcess(FeedDto feedDto, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        feedService.upload(feedDto,customUserDetails);
        return "redirect:/feed/singleFeed/" + customUserDetails.getLoggedMember().getId();
    }
    @GetMapping("/singleFeed/{id}")
    public String singleFeed(@PathVariable Long id, Model model) {
        Feed getFeedInfo = feedService.loadSingleFeed(id);
        // log.info("getFeedInfo =={}", getFeedInfo.toString());
        model.addAttribute("getFeedInfo", getFeedInfo);
        return "/feed/singleFeed";
    }
}

