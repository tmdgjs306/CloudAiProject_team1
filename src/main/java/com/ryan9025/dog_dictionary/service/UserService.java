package com.ryan9025.dog_dictionary.service;

import com.ryan9025.dog_dictionary.dto.user.UserProfileDto;
import com.ryan9025.dog_dictionary.entity.User;
import com.ryan9025.dog_dictionary.repository.FollowRepository;
import com.ryan9025.dog_dictionary.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnailator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final FollowRepository followRepository;

    @Value("${file.path}")
    private String uploadFolder;

    public UserProfileDto getProfile(Long id, Long customUserDetailsId) {
        UserProfileDto userProfileDto = new UserProfileDto();
        User userInfo =
                userRepository.findById(id).orElseThrow(
                        () -> new UsernameNotFoundException("없는 사용자 입니다.")
                );

        int followState = followRepository.followState(id, customUserDetailsId);
        int followingCount = followRepository.followingCount(customUserDetailsId);
        int followerCount = followRepository.followerCount(id);

        userProfileDto.setPageOwner(id.equals(customUserDetailsId));
        userProfileDto.setUser(userInfo);
        userProfileDto.setImageTotal(userInfo.getFeedList().size());
        userProfileDto.setFollowState(followState >= 1);
        userProfileDto.setFollowerCount(followerCount);
        userProfileDto.setFollowingCount(followingCount);

        userInfo.getFeedList().forEach((feed)->{
            feed.setLikesTotal(feed.getLikes().size());
        });

        return userProfileDto;
    }
    @Transactional
    public User changeProfile(Long id, MultipartFile profileImageUrl) {
        log.info("id ==={}",id);
        String originalFileName = profileImageUrl.getOriginalFilename();
        UUID uuid = UUID.randomUUID();
        String imageFileName = uuid + "_" + originalFileName;
        String thumbnailFileName = "thumb_" + imageFileName;

        Path imageFilePath = Paths.get(uploadFolder + imageFileName);
        File originalFile = new File(uploadFolder + imageFileName);
        try {
            Files.write(imageFilePath, profileImageUrl.getBytes());
            Thumbnailator.createThumbnail(originalFile,
                    new File(uploadFolder + thumbnailFileName), 150, 150);
            originalFile.delete();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        Optional<User> optionalUser = userRepository.findById(id);
        if(optionalUser.isPresent()) {
            optionalUser.get().setProfileImageUrl(thumbnailFileName);
            return optionalUser.get();
        } else {
            throw new UsernameNotFoundException("없는 사용자 입니다.");
        }
    }
    public void updateProfile(Long id, String nickname, String intro) {
        User user = userRepository.findById(id).orElseThrow(()->new IllegalArgumentException("존재하지 않는 사용자입니다."));
        user.setNickname(nickname);
        user.setIntro(intro);

        userRepository.save(user);
    }
}
