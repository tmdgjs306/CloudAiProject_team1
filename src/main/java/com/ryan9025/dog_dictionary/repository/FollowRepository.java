package com.ryan9025.dog_dictionary.repository;

import com.ryan9025.dog_dictionary.entity.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    // 팔로우 하는 기능
    @Modifying
    @Query(value = "INSERT INTO follow(from_user_id,to_user_id,createdDate) VALUES(:fromUserId,:toUserId,now())", nativeQuery = true)
    void follow(@Param(value = "fromUserId") Long fromUserId, @Param(value = "toUserId") Long toUserId);

    // 언팔로우 하는 기능
    @Modifying
    @Query(value = "DELETE FROM follow WHERE from_user_id =:fromUserId AND to_user_id =:toUserId", nativeQuery = true)
    void unFollow(@Param(value = "fromUserId") Long fromUserId, @Param(value = "toUserId") Long toUserId);

    // 팔로우 상태를 나타내는 기능 ( 팔로우가 된 상태 = 1, 아니면 0)
    @Query(value = "SELECT COUNT(*) FROM follow WHERE from_user_id = :loggedUserId AND to_user_id = :urlId", nativeQuery = true)
    int followState(@Param(value = "loggedUserId") Long loggedUserId, @Param(value = "urlId") Long urlId);

    // 팔로잉 수를 나타내는 기능
    @Query(value = "SELECT COUNT(*) FROM follow WHERE from_user_id = :urlId", nativeQuery = true)
    int followingCount(@Param(value = "urlId") Long urlId);

    // 팔로워 수를 나타내는 기능
     @Query(value = "SELECT COUNT(*) FROM follow WHERE to_user_id = :urlId", nativeQuery = true)
     int followerCount(@Param(value = "urlId") Long urlId);

    // fromUser가 특정 사용자(userId)인 경우의 팔로우 목록을 조회하는 쿼리
    @Query("SELECT f FROM Follow f WHERE f.fromUser.id = :userId")
    List<Follow> findByFromUserId(@Param("userId") Long userId);
}