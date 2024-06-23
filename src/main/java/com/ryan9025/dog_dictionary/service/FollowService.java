package com.ryan9025.dog_dictionary.service;

import com.ryan9025.dog_dictionary.repository.FollowRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class FollowService {
    private final FollowRepository followRepository;
    @PersistenceContext
    EntityManager em;

    // 팔로우 기능
    @Transactional
    public void follow(Long from_user_id, Long to_user_id) {
        // 팔로우 상태가 false(0) 이면 follow
        if(followRepository.followState(from_user_id,to_user_id) == 0) {
            followRepository.follow(from_user_id,to_user_id);

            // 팔로우 상태가 true(1) 이면 unFollow
        }else {
            followRepository.unFollow(from_user_id,to_user_id);
        }
    }


    /*@Transactional
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

    }*/


}
