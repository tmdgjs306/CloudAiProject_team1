package com.ryan9025.dog_dictionary.service;

import com.ryan9025.dog_dictionary.dto.follow.FollowDto;
import com.ryan9025.dog_dictionary.exception.CustomApiException;
import com.ryan9025.dog_dictionary.repository.FollowRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.qlrm.mapper.JpaResultMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class FollowService {
    private final FollowRepository followRepository;
    @PersistenceContext
    EntityManager em;

    @Transactional
    public List<FollowDto> followerList(Long loggedUserId, Long urlId) {

        String queryString = "SELECT u.id AS id , u.nickname, u.profileImageUrl, " +
                             "if((SELECT 1 FROM follow WHERE from_user_id = ? AND to_user_id = u.id), 1, 0) AS followState, " +
                             "if((? = u.id), 1, 0) AS equalState " +
                             "FROM user u INNER JOIN follow f " +
                             "ON u.id = f.to_user_id " +
                             "WHERE f.from_user_id = ?";

        Query query = em.createNativeQuery(queryString)
                .setParameter(1, loggedUserId)
                .setParameter(2, loggedUserId)
                .setParameter(3, urlId);
        JpaResultMapper jpaResultMapper = new JpaResultMapper();
        List<FollowDto> followDtoList = jpaResultMapper.list(query,FollowDto.class);
        return followDtoList;

    }

    @Transactional
    public void follow(Long from_user_id, Long to_user_id) {
        try{
            followRepository.follow(from_user_id,to_user_id);
        }catch (Exception e) {
            throw new CustomApiException("이미 팔로우 하고 있는 유저입니다.");
        }
    }

    @Transactional
    public void unFollow(Long from_user_id, Long to_user_id) {
        followRepository.unFollow(from_user_id,to_user_id);
    }
}
