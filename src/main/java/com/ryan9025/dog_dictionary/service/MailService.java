package com.ryan9025.dog_dictionary.service;

import com.ryan9025.dog_dictionary.util.MailAuthentication;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender javaMailSender;
    private final MailAuthentication mailAuthentication;
    public void sendAuthMail(String userEmail) throws MessagingException {
        // 인증메일 발송
        MimeMessage message = mailAuthentication.createMail(userEmail);
        javaMailSender.send(message);
    }
}
