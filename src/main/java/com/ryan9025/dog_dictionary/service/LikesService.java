package com.ryan9025.dog_dictionary.service;

import com.ryan9025.dog_dictionary.repository.LikesRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class LikesService {

    private final LikesRepository likesRepository;

    @Transactional
    public int likes(Long feedId, Long customDetailsId){
        int result = likesRepository.likes(feedId, customDetailsId);
        log.info("result==={}",result);
        return result;
    }

    @Transactional
    public int unLikes(Long feedId, Long customDetailsId){
        int result = likesRepository.unLikes(feedId, customDetailsId);
        log.info("result==={}",result);
        return result;
    }
}