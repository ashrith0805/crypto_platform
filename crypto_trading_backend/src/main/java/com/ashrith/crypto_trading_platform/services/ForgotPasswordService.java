package com.ashrith.crypto_trading_platform.services;
import com.ashrith.crypto_trading_platform.domain.VerificationType;
import com.ashrith.crypto_trading_platform.model.ForgotPasswordToken;
import com.ashrith.crypto_trading_platform.model.User;
import org.springframework.stereotype.Service;

@Service
public interface ForgotPasswordService {

    ForgotPasswordToken createToken(User user,
                                    String id,
                                    String otp,
                                    String verificationType,
                                    String sendTo);

    ForgotPasswordToken findById(String id) throws Exception;

    ForgotPasswordToken findByUser(Long userId);

    void deleteToken(ForgotPasswordToken token);

}
