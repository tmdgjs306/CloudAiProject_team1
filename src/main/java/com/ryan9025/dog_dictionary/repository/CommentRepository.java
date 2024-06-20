package com.ryan9025.dog_dictionary.repository;

import com.ryan9025.dog_dictionary.entity.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comments, Long> {
}
