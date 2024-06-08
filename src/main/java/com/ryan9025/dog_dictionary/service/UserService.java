package com.ryan9025.dog_dictionary.service;

import com.ryan9025.dog_dictionary.constant.Role;
import com.ryan9025.dog_dictionary.dto.JoinDto;
import com.ryan9025.dog_dictionary.dto.UserProfileDto;
import com.ryan9025.dog_dictionary.entity.User;
import com.ryan9025.dog_dictionary.repository.FollowRepository;
import com.ryan9025.dog_dictionary.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnailator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final FollowRepository followRepository;

    @Value("${file.path}")
    private String uploadFolder;

    public void join(JoinDto joinDto) {
        User dbJoinUser = User.builder()
                .userId(joinDto.getUserId())
                .password(bCryptPasswordEncoder.encode(joinDto.getPassword()))
                .nickname(joinDto.getNickname())
                .tel(joinDto.getTel())
                .email(joinDto.getEmail())
                .role(Role.USER.getRole())
                .build();
        userRepository.save(dbJoinUser);
    }

    public UserProfileDto getProfile(Long id, int customUserDetailsId) {
        UserProfileDto userProfileDto = new UserProfileDto();
        User userInfo =
                userRepository.findById(id).orElseThrow(
                        () -> new UsernameNotFoundException("없는 사용자 입니다.")
                );
        int followCount = followRepository.followCount(id);
        int followState = followRepository.followState(id, (long) customUserDetailsId);

        userProfileDto.setPageOwner(id == customUserDetailsId);
        userProfileDto.setUser(userInfo);
        userProfileDto.setFollowCount(followCount);
        userProfileDto.setFollowState(followState > 1);
        userProfileDto.setImageTotal(userInfo.getFeedList().size());

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
}
