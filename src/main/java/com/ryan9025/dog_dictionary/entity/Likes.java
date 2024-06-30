package com.ryan9025.dog_dictionary.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ryan9025.dog_dictionary.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "likes_uk",
                        columnNames = {"feedId", "userId"}
                )
        }
)
public class Likes extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "feedId")
    @ManyToOne(fetch = FetchType.LAZY)
    private Feed feed;

    @JsonIgnoreProperties({"feedList"})
    @JoinColumn(name = "userId")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;


}
