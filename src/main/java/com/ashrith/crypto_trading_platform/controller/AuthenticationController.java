package com.ashrith.crypto_trading_platform.controller;

import com.ashrith.crypto_trading_platform.Utilities.OTPUtils;
import com.ashrith.crypto_trading_platform.config.JwtProvider;
import com.ashrith.crypto_trading_platform.model.TwoFactorOTP;
import com.ashrith.crypto_trading_platform.model.User;
import com.ashrith.crypto_trading_platform.repository.UserRepository;
import com.ashrith.crypto_trading_platform.response.AuthResponse;
import com.ashrith.crypto_trading_platform.services.CustomUserDetailsService;
import com.ashrith.crypto_trading_platform.services.EmailService;
import com.ashrith.crypto_trading_platform.services.TwoFactorOTPService;
import jakarta.persistence.EntityExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.ArrayList;
import java.util.Arrays;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomUserDetailsService customUserDetails;

    @Autowired
    private TwoFactorOTPService twoFactorOTPService;

    @Autowired
    private EmailService emailService;



    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> register(@RequestBody User user){
        User test=userRepository.findByEmail(user.getEmail());
        if(test!=null) throw new EntityExistsException("Email already exists");
        User newUser=new User();
        newUser.setFullName(user.getFullName());
        newUser.setPassword(user.getPassword());
        newUser.setEmail(user.getEmail());
        userRepository.save(newUser);
        Authentication authed = new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authed);
        String jwt= JwtProvider.generateToken(authed);
        AuthResponse response=new AuthResponse();
        response.setJwt(jwt);
        response.setMessage("Register success");
        return new ResponseEntity<AuthResponse>(response,HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> logIn(@RequestBody User user) throws Exception {
        String username=user.getEmail();
        String password=user.getPassword();
        Authentication authed=authenticate(username,password);
        SecurityContextHolder.getContext().setAuthentication(authed);
        String jwt = JwtProvider.generateToken(authed);
        User authUser=userRepository.findByEmail(username);
        if(user.getTwoFactorAuth().isEnabled()){
          AuthResponse res=new AuthResponse();
          res.setMessage("Two factor auth is enabled");
          res.setTwoFactorAuthEnabled(true);
          String otp= OTPUtils.generateOTP();
          TwoFactorOTP twoFactor=twoFactorOTPService.findByUser(authUser.getId());
          if(twoFactor!=null) twoFactorOTPService.deleteTwoFactorOtp(twoFactor);
          TwoFactorOTP newTwoFactorOTP=twoFactorOTPService.createTwoFactorOtp(user,otp,jwt);
          emailService.sendVerificationOtpEmail(username,otp);
          res.setSession(new TwoFactorOTP().getId());
          return new ResponseEntity<>(res,HttpStatus.ACCEPTED);
        }
        AuthResponse response = new AuthResponse();
        response.setJwt(jwt);
        response.setMessage("Log in success");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private Authentication authenticate(String username, String password){
        UserDetails userDetails = customUserDetails.loadUserByUsername(username);

        System.out.println("sign in userDetails - " + userDetails);
        if(userDetails==null) {
            System.out.println("sign in userDetails - null " + userDetails);
            throw new BadCredentialsException("Invalid username or password");
        }
        if(!password.equals(userDetails.getPassword())) throw new BadCredentialsException("Wrong password entered");
        return new UsernamePasswordAuthenticationToken(userDetails,password,userDetails.getAuthorities());
    }


    @PostMapping("/two-factor/otp/{otp}")
    public ResponseEntity<AuthResponse> verfiyOtp(@PathVariable String otp, @RequestParam String id) throws Exception {
       TwoFactorOTP twoFactorOTP=twoFactorOTPService.findById(id);
       if(twoFactorOTPService.verifyTwoFactorOtp(twoFactorOTP,otp)){
           AuthResponse res=new AuthResponse();
           res.setMessage("Two factor authentication verified");
           res.setTwoFactorAuthEnabled(true);
           res.setJwt(twoFactorOTP.getJwt());
           return new ResponseEntity<>(res,HttpStatus.OK);
       }
       throw new Exception("Invalid Otp");
    }

}

