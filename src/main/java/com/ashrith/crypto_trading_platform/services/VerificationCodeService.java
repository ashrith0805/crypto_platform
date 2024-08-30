package com.ashrith.crypto_trading_platform.services;

import com.ashrith.crypto_trading_platform.domain.VerificationType;
import com.ashrith.crypto_trading_platform.model.User;
import com.ashrith.crypto_trading_platform.model.VerificationCode;
import com.ashrith.crypto_trading_platform.repository.VerificationCodeRepository;
import org.springframework.stereotype.Service;

@Service
public interface VerificationCodeService {
    VerificationCode sendVerification(VerificationType verificationType, User user);

    VerificationCode getVerificationCodeById(Long id) throws Exception;

    VerificationCode findVerificationCodeByUser(Long userId) throws Exception;

    void deleteVerificationCodeById(VerificationCode verificationCode);


}
