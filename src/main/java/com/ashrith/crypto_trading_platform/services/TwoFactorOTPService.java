package com.ashrith.crypto_trading_platform.services;

import com.ashrith.crypto_trading_platform.model.TwoFactorOTP;
import com.ashrith.crypto_trading_platform.model.User;

import org.springframework.stereotype.Service;

@Service
public interface TwoFactorOTPService {

    TwoFactorOTP createTwoFactorOtp(User user, String otp, String jwt);

    TwoFactorOTP findByUser(Long userId) throws Exception;

    TwoFactorOTP findById(String id) throws Exception;

    boolean verifyTwoFactorOtp(TwoFactorOTP twoFactorOTP, String otp);

    void deleteTwoFactorOtp(TwoFactorOTP twoFactorOTP) throws Exception;




}
