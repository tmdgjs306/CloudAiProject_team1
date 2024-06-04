package com.ryan9025.dog_dictionary.repository;

import com.ryan9025.dog_dictionary.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board,Long> {


}
