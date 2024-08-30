package com.ashrith.crypto_trading_platform.services;

import com.ashrith.crypto_trading_platform.Utilities.OTPUtils;
import com.ashrith.crypto_trading_platform.domain.VerificationType;
import com.ashrith.crypto_trading_platform.model.User;
import com.ashrith.crypto_trading_platform.model.VerificationCode;
import com.ashrith.crypto_trading_platform.repository.VerificationCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VerificationCodeServiceImpl implements VerificationCodeService {

    @Autowired
    private VerificationCodeRepository verificationCodeRepository;
    @Override
    public VerificationCode sendVerification(VerificationType verificationType, User user) {
        VerificationCode verificationCode1=new VerificationCode();
        verificationCode1.setOtp(OTPUtils.generateOTP());
        verificationCode1.setVerificationType(verificationType);
        verificationCode1.setUser(user);
        return verificationCodeRepository.save(verificationCode1);
    }

    @Override
    public VerificationCode getVerificationCodeById(Long id) throws Exception {
        Optional<VerificationCode> code=verificationCodeRepository.findById(id);
        if(code.isEmpty()) throw new Exception("Verification not found");
        return code.get();
    }

    @Override
    public VerificationCode findVerificationCodeByUser(Long userId) throws Exception {
       VerificationCode code=verificationCodeRepository.findByUserId(userId);
        return code;
    }

    @Override
    public void deleteVerificationCodeById(VerificationCode verificationCode) {
        verificationCodeRepository.delete(verificationCode);
    }
}
