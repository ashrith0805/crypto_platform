package com.ashrith.crypto_trading_platform.controller;


import com.ashrith.crypto_trading_platform.requests.ForgotPasswordTokenRequest;
import com.ashrith.crypto_trading_platform.Utilities.OTPUtils;
import com.ashrith.crypto_trading_platform.requests.ResetPasswordRequest;
import com.ashrith.crypto_trading_platform.domain.VerificationType;
import com.ashrith.crypto_trading_platform.model.ForgotPasswordToken;
import com.ashrith.crypto_trading_platform.model.User;
import com.ashrith.crypto_trading_platform.model.VerificationCode;
import com.ashrith.crypto_trading_platform.response.APIResponse;
import com.ashrith.crypto_trading_platform.response.AuthResponse;
import com.ashrith.crypto_trading_platform.services.EmailService;
import com.ashrith.crypto_trading_platform.services.ForgotPasswordService;
import com.ashrith.crypto_trading_platform.services.UserServiceImpl;
import com.ashrith.crypto_trading_platform.services.VerificationCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
public class UserController {

    @Autowired
    UserServiceImpl userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private VerificationCodeService verificationCodeService;

    @Autowired
    private ForgotPasswordService forgotPasswordService;


    @GetMapping("/api/users/profile")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }


    /*
    A patch method is intended for partically updating a resource rather than put
    which creates a new record altogether. Send only the chnages to the resources rather than the whole
    resource.
     */
    @PostMapping("/api/users/verification/{verificationType}/send-otp")
    public ResponseEntity<String> sendVerificationOtp(@RequestHeader("Authorization") String jwt,
                                                      @PathVariable VerificationType verificationType) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        VerificationCode verificationCode = verificationCodeService.findVerificationCodeByUser(user.getId());
        if (verificationCode == null) {
            verificationCode = verificationCodeService.sendVerification(verificationType, user);
        }
        if (verificationType.equals(VerificationType.EMAIL)) {
            emailService.sendVerificationOtpEmail(user.getEmail(), verificationCode.getOtp());
        }
        return new ResponseEntity<>("Verification otp sent succesfully", HttpStatus.OK);
    }

    @PatchMapping("/api/users/enable-two-factor/verify-otp/{otp}")
    public ResponseEntity<User> enableTwoFactorAuthentication(@RequestHeader("Authorization")
                                                              String jwt, @PathVariable String otp) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        VerificationCode verificationCode = verificationCodeService.findVerificationCodeByUser(user.getId());
        String sendTo;
        if (verificationCode.getVerificationType().equals(VerificationType.EMAIL)) {
            sendTo = user.getEmail();
        } else {
            sendTo = user.getEmail();
        }
        boolean isVerified = verificationCode.getOtp().equals(otp);
        if (isVerified) {
            User updated = userService.enableTwoFactorAuthentication(verificationCode.getVerificationType()
                    , user, sendTo);

            verificationCodeService.deleteVerificationCodeById(verificationCode);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        }
        throw new Exception("Wrong otp");
    }

    @PostMapping("/auth/users/reset-password/send-otp")
    public ResponseEntity<AuthResponse> sendForgotPasswordOtp(

            @RequestBody ForgotPasswordTokenRequest request
            ) throws Exception {
        User user=userService.findUserByEmail(request.getSendTo());
        String otp= OTPUtils.generateOTP();
        UUID uuid=UUID.randomUUID();
        String id=uuid.toString();
        ForgotPasswordToken token=forgotPasswordService.findByUser(user.getId());
        if(token==null){
            token=forgotPasswordService.createToken(user,id,otp,request.getVerificationType(), request.getSendTo());
         }
        else{
            forgotPasswordService.deleteToken(forgotPasswordService.findById(id));
        }
        if(request.getVerificationType().equals(VerificationType.EMAIL.getValue())){
            emailService.sendVerificationOtpEmail(user.getEmail(),otp);
        }

        AuthResponse response=new AuthResponse();
        response.setSession(token.getId());
        response.setMessage("Password otp sent succesfully");
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @PatchMapping("/auth/users/reset-password/verify-otp")
    public ResponseEntity<APIResponse> verifyResetPasswordOtp(@RequestBody ResetPasswordRequest req, @RequestParam String id) throws Exception {

       ForgotPasswordToken token=forgotPasswordService.findById(id);
       boolean isVerified=token.getOtp().equals(req.getOtp());
       if(isVerified){
           User user=userService.updatePassword(token.getUser(),req.getPassword());
           APIResponse resp=new APIResponse();
           resp.setMessage("Password updated succesfully");
           forgotPasswordService.deleteToken(token);
           return new ResponseEntity<>(resp,HttpStatus.OK);
       }
       throw new Exception("Wrong otp");
    }















}
