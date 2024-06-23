package com.ryan9025.dog_dictionary.api;

import com.ryan9025.dog_dictionary.dto.auth.CustomUserDetails;
import com.ryan9025.dog_dictionary.dto.follow.FollowDto;
import com.ryan9025.dog_dictionary.entity.Follow;
import com.ryan9025.dog_dictionary.service.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class FollowApiController {

    private final FollowService followService;

    @PostMapping("/api/follow/{to_user_id}")
    public Map<String, Object> follow(@AuthenticationPrincipal CustomUserDetails customUserDetails,
                                      @PathVariable Long to_user_id) {

        followService.follow(customUserDetails.getLoggedUser().getId(), to_user_id);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("팔로우", "ok");
        return resultMap;
    }

    @DeleteMapping("/api/follow/{to_user_id}")
    public Map<String, Object> unFollow(@AuthenticationPrincipal CustomUserDetails customUserDetails,
                                        @PathVariable Long to_user_id) {

        followService.follow(customUserDetails.getLoggedUser().getId(), to_user_id);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("언팔로우", "ok");
        return resultMap;
    }

    /* fromUser가 특정 사용자(userId)인 경우의 팔로우 목록을 반환하는 엔드포인트
    @GetMapping("/api/following/{userId}")
    public List<FollowDto> getFollowing(@PathVariable Long userId) {
        List<Follow> follows = followService.getFollowing(userId);
        return follows.stream()
                .map(follow -> new FollowDto(follow.getId(), follow.getToUser().getNickname()))
                .collect(Collectors.toList());
    }

     */
}