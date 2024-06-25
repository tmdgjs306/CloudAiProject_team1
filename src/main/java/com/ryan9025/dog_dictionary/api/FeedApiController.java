package com.ryan9025.dog_dictionary.api;

import com.ryan9025.dog_dictionary.dto.auth.CustomUserDetails;
import com.ryan9025.dog_dictionary.dto.feed.FeedDto;
import com.ryan9025.dog_dictionary.entity.Feed;
import com.ryan9025.dog_dictionary.repository.FeedRepository;
import com.ryan9025.dog_dictionary.service.FeedService;
import com.ryan9025.dog_dictionary.service.LikesService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.web.PagedModel;
import org.springframework.data.web.HateoasPageableHandlerMethodArgumentResolver;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
public class FeedApiController {

    private final FeedService feedService;
    private final LikesService likesService;
    private final FeedRepository feedRepository;

    @GetMapping("/feedList")
    public Map<String, Object> loadFeed(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @PageableDefault(size = 3) Pageable pageable
    ) {
        Map<String,Object> resultMap = new HashMap<>();
        Page<Feed> feedList = feedService.loadFeeds(customUserDetails.getLoggedUser().getId(),pageable);
        resultMap.put("feedList",feedList);

        return resultMap;
    }

    @PostMapping("/feedList/{feedId}/likes")
    public Map<String,Object> likes(@PathVariable Long feedId,
                                    @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        int result = likesService.likes(feedId,customUserDetails.getLoggedUser().getId());
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("좋아요","ok");
        return resultMap;
    }

    @DeleteMapping("/feedList/{feedId}/likes")
    public Map<String,Object> unLikes(@PathVariable Long feedId,
                                   @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        int result = likesService.unLikes(feedId,customUserDetails.getLoggedUser().getId());
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("싫어요","ok");
        return resultMap;
    }

}
