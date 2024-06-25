package com.ryan9025.dog_dictionary.service;

import com.ryan9025.dog_dictionary.constant.RoleType;
import com.ryan9025.dog_dictionary.dto.auth.JoinDto;
import com.ryan9025.dog_dictionary.dto.user.UserProfileDto;
import com.ryan9025.dog_dictionary.entity.User;
import com.ryan9025.dog_dictionary.repository.UserRepository;
import groovy.util.logging.Slf4j;
import lombok.RequiredArgsConstructor;
import net.coobird.thumbnailator.Thumbnailator;
import org.hibernate.mapping.Join;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
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
public class AuthService {
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserRepository userRepository;

    public User join(JoinDto joinDto) {
        User dbJoinMember = User.builder()
                .userId(joinDto.getUserId())
                .password(bCryptPasswordEncoder.encode(joinDto.getPassword()))
                .nickname(joinDto.getNickname())
                .postcode(joinDto.getPostcode())
                .address(joinDto.getAddress())
                .detailAddress(joinDto.getDetailAddress())
                .email(joinDto.getEmail())
                .role(RoleType.USER)
                .size(joinDto.getSize())
                .build();
        return userRepository.save(dbJoinMember);
    }

    /*public JoinDto selectProfile(MultipartFile profileImageUrl) {
        JoinDto joinDto = JoinDto.builder().profileImageUrl(profileImageUrl).build();
        String originalFileName = profileImageUrl.getOriginalFilename();
        UUID uuid = UUID.randomUUID();
        String imageFileName = uuid + "_" + originalFileName;
        String thumbnailFileName = "thumb" + imageFileName;

        Path imageFilePath = Paths.get(uploadFolder + imageFileName);
        File originalFile = new File(uploadFolder + imageFileName);
        try {
            Files.write(imageFilePath, profileImageUrl.getBytes());
            Thumbnailator.createThumbnail(originalFile,
                    new File(uploadFolder + thumbnailFileName), 150,150);
            originalFile.delete();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return joinDto;
    }*/

    public int idCheck(String userId) {
        Optional<User> optionalUser = userRepository.findByUserId(userId);
        if (optionalUser.isEmpty()) {
            return 0;
        }
        return 1;
    }
    public int emailCheck(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty()) {
            return 0;
        }
        return 1;
    }

}
