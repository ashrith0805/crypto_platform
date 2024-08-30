package com.ashrith.crypto_trading_platform.services;


import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendVerificationOtpEmail(String email,String otp) throws MessagingException {
        MimeMessage mimeMessage= mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper=new MimeMessageHelper(mimeMessage,"utf-8");
        String subject="OTP verification";
        String body="Your verification code is "+ otp;
        mimeMessageHelper.setSubject(subject);
        mimeMessageHelper.setText(body);
        mimeMessageHelper.setTo(email);

        try{
             mailSender.send(mimeMessage);
        } catch(MailException e){
            throw new MailSendException("mail exception occured");
        }
    }
}
