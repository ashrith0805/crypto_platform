package com.ashrith.crypto_trading_platform.services;

import com.ashrith.crypto_trading_platform.domain.VerificationType;
import com.ashrith.crypto_trading_platform.model.ForgotPasswordToken;
import com.ashrith.crypto_trading_platform.model.User;
import com.ashrith.crypto_trading_platform.repository.ForgotPasswordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ForgotPasswordImpl implements ForgotPasswordService {

    @Autowired
    ForgotPasswordRepository forgotPasswordRepository;
    @Override
    public ForgotPasswordToken createToken(User user, String id, String otp, String verificationType, String sendTo) {
        ForgotPasswordToken token=new ForgotPasswordToken();
        token.setId(id);
        token.setUser(user);
        token.setOtp(otp);
        token.setSendTo(sendTo);
        token.setVerificationType(verificationType);
        return forgotPasswordRepository.save(token);
    }

    @Override
    public ForgotPasswordToken findById(String id) throws Exception {
        Optional<ForgotPasswordToken> token=forgotPasswordRepository.findById(id);
        return token.orElse(null);
    }

    @Override
    public ForgotPasswordToken findByUser(Long userId) {
        return forgotPasswordRepository.findByUserId(userId);
    }

    @Override
    public void deleteToken(ForgotPasswordToken token) {
        forgotPasswordRepository.delete(token);
    }
}
