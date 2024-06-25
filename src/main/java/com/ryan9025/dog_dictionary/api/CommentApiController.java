package com.ryan9025.dog_dictionary.api;

import com.ryan9025.dog_dictionary.dto.auth.CustomUserDetails;
import com.ryan9025.dog_dictionary.dto.comment.CommentDto;
import com.ryan9025.dog_dictionary.entity.Comments;
import com.ryan9025.dog_dictionary.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/api")
@RestController
@Slf4j
public class CommentApiController {

    private final CommentService commentService;

    /** <댓글 작성 과정>
     * 1. 게시물 id 와 작성자 id
     * 2. 일치하면 댓글 작성 **/

    @PostMapping("/comment")
    public Map<String, Object> saveComment(CommentDto commentDto,
                                           @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        Comments comments = commentService.saveComment(
                commentDto.getContent(),
                commentDto.getFeedId(),
                customUserDetails.getLoggedUser().getId());
        Map<String,Object> resultMap = new HashMap<>();
        log.info("responseDto ==={}",commentDto);
        resultMap.put("insert","ok");
        resultMap.put("comments",comments);
        return resultMap;
    }

    @DeleteMapping("/comment/{id}")
    public Map<String, Object> deleteComment(@PathVariable Long id) {
        commentService.deleteComment(id);
        Map<String,Object> resultMap = new HashMap<>();
        resultMap.put("delete","ok");
        return resultMap;
    }

}