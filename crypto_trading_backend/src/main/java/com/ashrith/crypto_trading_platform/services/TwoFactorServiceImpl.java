package com.ashrith.crypto_trading_platform.services;

import com.ashrith.crypto_trading_platform.model.TwoFactorOTP;
import com.ashrith.crypto_trading_platform.model.User;
import com.ashrith.crypto_trading_platform.repository.TwoFactorOtpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

/*
Generating a unique code that the user can use to log in to the website for extra securityd
Uniqyue otp record generated for each log in attempt
 */
@Service
public class TwoFactorServiceImpl implements TwoFactorOTPService{

    @Autowired
    TwoFactorOtpRepository twoFactorOtpRepository;
    @Override
    public TwoFactorOTP createTwoFactorOtp(User user, String otp, String jwt) {
        UUID uuid=UUID.randomUUID();
        // unique indentifier used to idnetify information 128 bit identifier eahc OTP
        //needs a unique identifier to distinguish it from other OTPs
        String id=uuid.toString();
        TwoFactorOTP twoFactorOTP=new TwoFactorOTP();
        twoFactorOTP.setOtp(otp);
        twoFactorOTP.setId(id);
        twoFactorOTP.setJwt(jwt);
        twoFactorOTP.setUser(user);
        return twoFactorOtpRepository.save(twoFactorOTP);
    }

    @Override
    public TwoFactorOTP findByUser(Long userId) throws Exception {
        TwoFactorOTP twoFactorOTP=twoFactorOtpRepository.findByUserId(userId);
        if(twoFactorOTP==null) throw new Exception("No otp exists for user");
        return twoFactorOTP;
    }

    @Override
    public TwoFactorOTP findById(String id) throws Exception {
        Optional<TwoFactorOTP> twoFactorOTP=twoFactorOtpRepository.findById(id);
       if(twoFactorOTP.isEmpty()) throw new Exception("OTP does not exist");
       return twoFactorOTP.get();
    }

    @Override
    public boolean verifyTwoFactorOtp(TwoFactorOTP twoFactorOTP, String otp) {
        return twoFactorOTP.getOtp().equals(otp);
    }

    @Override
    public void deleteTwoFactorOtp(TwoFactorOTP twoFactorOTP) throws Exception {
         twoFactorOtpRepository.delete(twoFactorOTP);
    }
}
