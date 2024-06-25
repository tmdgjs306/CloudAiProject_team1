package com.ryan9025.dog_dictionary.repository;

import com.ryan9025.dog_dictionary.entity.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LikesRepository extends JpaRepository<Likes, Long> {

    @Modifying
    @Query(value = "INSERT INTO likes(feedId, userId, createdDate) VALUES(:feedId, :loggedUserId, now())", nativeQuery = true)
    int likes(@Param(value = "feedId") Long feedId, @Param(value = "loggedUserId") Long loggedUserId);

    @Modifying
    @Query(value = "DELETE FROM likes WHERE feedId =:feedId AND userId =:loggedUserId", nativeQuery = true)
    int unLikes(@Param(value = "feedId") Long feedId, @Param(value = "loggedUserId") Long loggedUserId);


}