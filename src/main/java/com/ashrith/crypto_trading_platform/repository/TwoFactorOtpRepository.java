package com.ashrith.crypto_trading_platform.repository;

import com.ashrith.crypto_trading_platform.model.TwoFactorOTP;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TwoFactorOtpRepository extends JpaRepository<TwoFactorOTP,String >
{
    TwoFactorOTP findByUserId(Long userId);

}
