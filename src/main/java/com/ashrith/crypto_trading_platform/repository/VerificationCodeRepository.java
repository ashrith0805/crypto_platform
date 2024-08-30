package com.ashrith.crypto_trading_platform.repository;

import com.ashrith.crypto_trading_platform.model.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationCodeRepository extends JpaRepository<VerificationCode,Long> {

    public VerificationCode findByUserId(Long id);
}
