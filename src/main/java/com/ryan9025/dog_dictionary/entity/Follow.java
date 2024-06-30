package com.ryan9025.dog_dictionary.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ryan9025.dog_dictionary.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Getter
@NoArgsConstructor
@Entity
@Table(
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "follow_uk",
                        columnNames = {"from_user_id", "to_user_id"}
                )
        }
)
public class Follow extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_user_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User fromUser; // 팔로우를 하는 사람

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_user_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User toUser; // 팔로우를 받는 사람


}