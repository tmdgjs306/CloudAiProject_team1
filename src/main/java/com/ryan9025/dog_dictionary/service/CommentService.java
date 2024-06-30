package com.ryan9025.dog_dictionary.service;

import com.ryan9025.dog_dictionary.entity.Comments;
import com.ryan9025.dog_dictionary.entity.Feed;
import com.ryan9025.dog_dictionary.entity.User;
import com.ryan9025.dog_dictionary.repository.CommentRepository;
import com.ryan9025.dog_dictionary.repository.FeedRepository;
import com.ryan9025.dog_dictionary.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final FeedService feedService;

    @Transactional
    public Comments saveComment(String content, Long feedId, Long customDetailsId) {
        Feed feed = feedService.getFeedId(feedId);
        User userEntity = userRepository.findById(customDetailsId).orElseThrow(()-> new UsernameNotFoundException("없는 유저입니다."));

        Comments comments = Comments.builder()
                .content(content)
                .feed(feed)
                .user(userEntity)
                .build();
        return commentRepository.save(comments);
    }

    @Transactional
    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }
}

