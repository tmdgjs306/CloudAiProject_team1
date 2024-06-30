package com.ryan9025.dog_dictionary.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ryan9025.dog_dictionary.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class Feed extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String imageUrl;
    private String content;

    @JsonIgnoreProperties({"feedList"})
    @JoinColumn(name = "userId")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @JsonIgnoreProperties({"feed"})
    @OneToMany(mappedBy = "feed")
    private List<Likes> likes;

    @Transient
    private boolean likesState;

    @Transient
    private int likesTotal;

    @OrderBy("id DESC")
    @JsonIgnoreProperties({"feed"})
    @OneToMany(mappedBy = "feed",fetch = FetchType.EAGER,cascade = CascadeType.REMOVE)
    private List<Comments> comments;

}
