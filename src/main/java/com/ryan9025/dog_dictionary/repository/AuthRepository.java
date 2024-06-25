package com.ryan9025.dog_dictionary.repository;

import com.ryan9025.dog_dictionary.entity.Authentication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthRepository extends JpaRepository<Authentication, Long> {
}
