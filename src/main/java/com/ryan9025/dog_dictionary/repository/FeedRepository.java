package com.ryan9025.dog_dictionary.repository;

import com.ryan9025.dog_dictionary.entity.Feed;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedRepository extends JpaRepository<Feed,Long> {
    @Query(value = "SELECT * FROM feed WHERE userId IN " +
            "(SELECT to_user_id from follow where from_user_id = :loggedUserId)", nativeQuery = true)
    Page<Feed> feed (@Param(value = "loggedUserId") Long loggedUserId, @Param(value = "pageable") Pageable pageable);

    @Query(value = "SELECT f.* FROM feed f INNER JOIN (SELECT feedId, COUNT(feedId) likesCount FROM likes GROUP BY feedId) c ON f.id = c.feedId ORDER BY likesCount DESC", nativeQuery = true)
    List<Feed> popularFeeds();

    List<Feed> findByUserId(Long userId);
}
