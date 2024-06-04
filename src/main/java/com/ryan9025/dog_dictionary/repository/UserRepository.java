package com.ryan9025.dog_dictionary.repository;

import com.ryan9025.dog_dictionary.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByUserId(String userId);
}
