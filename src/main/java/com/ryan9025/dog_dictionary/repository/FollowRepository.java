package com.ryan9025.dog_dictionary.repository;

import com.ryan9025.dog_dictionary.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    @Modifying
    @Query(value = "INSERT INTO follow(from_user_id,to_user_id) VALUES(:fromUserId,:toUserId)", nativeQuery = true)
    void follow(@Param(value = "fromUserId") Long fromUserId, @Param(value = "toUserId") Long toUserId);

    @Modifying
    @Query(value = "DELETE FROM follow WHERE from_user_id =:fromUserId AND to_user_id =:toUserId", nativeQuery = true)
    void unFollow(@Param(value = "fromUserId") Long fromUserId, @Param(value = "toUserId") Long toUserId);

    @Query(value = "SELECT COUNT(*) FROM follow WHERE from_user_id = :loggedUserId AND to_user_id = :urlId", nativeQuery = true)
    int followState(@Param(value = "loggedUserId") Long loggedUserId, @Param(value = "urlId") Long urlId);

    @Query(value = "SELECT COUNT(*) FROM follow WHERE from_user_id = :loggedUserId", nativeQuery = true)
    int followingCount(@Param(value = "loggedUserId") Long loggedUserId);

     @Query(value = "SELECT COUNT(*) FROM follow WHERE to_user_id = :urlId", nativeQuery = true)
     int followerCount(@Param(value = "urlId") Long urlId);

     List<Follow> findByToUserId(Long toUserId);
}