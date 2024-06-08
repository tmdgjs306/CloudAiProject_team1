package com.ryan9025.dog_dictionary.api;

import com.ryan9025.dog_dictionary.dto.CustomUserDetails;
import com.ryan9025.dog_dictionary.dto.FollowDto;
import com.ryan9025.dog_dictionary.entity.User;
import com.ryan9025.dog_dictionary.service.FollowService;
import com.ryan9025.dog_dictionary.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
public class UserApiController {
    private final UserService userService;

    @PutMapping("/user/{id}/profileImageUrl")
    public Map<String,Object> profileImageUpdate(@PathVariable Long id,
                                                 MultipartFile profileImageUrl) {
        log.info("profileImageUrl ==={}",profileImageUrl);
        User userInfo = userService.changeProfile(id,profileImageUrl);
        log.info(userInfo.toString());
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("isState","OK");
        resultMap.put("userInfo",userInfo);

        return resultMap;
    }

}
