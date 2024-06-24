package com.ryan9025.dog_dictionary.util;

import com.ryan9025.dog_dictionary.entity.Authentication;
import com.ryan9025.dog_dictionary.repository.AuthRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MailAuthentication {
    private final JavaMailSender javaMailSender;
    private final AuthRepository authRepository;
    private String randomNumber;
    // 랜덤 인증번호 생성
    public String createRandomNumber() {
        return randomNumber = "" + ((int) (Math.random() * 90000) + 10000);
    }

    // 인증메일 생성
    public MimeMessage createMail(String mail) throws MessagingException {
        // 인증번호 생성
        String randomNum = createRandomNumber();
        // 생성된 인증번호를 authentication db에 저장
        Authentication dbInsertCode = Authentication.builder()
                .userEmail(mail)
                .randomCode(randomNum).build();
        authRepository.save(dbInsertCode);
        // 인증메일 발신자, 메일 내용 설정
        MimeMessage message = javaMailSender.createMimeMessage();
        message.setFrom("devryan9025@naver.com"); // 발신자
        message.setRecipients(MimeMessage.RecipientType.TO,mail);
        message.setSubject("이메일 검증"); // 메일 제목
        String content = "<h2>요청하신 인증번호입니다.</h2>"; // 메일 내용
        content+="<h1>"+ randomNumber +"</h1>";
        message.setText(content,"UTF-8","html"); // 표현 방식
        return message;
    }
}
