package com.ashrith.crypto_trading_platform.repository;

import com.ashrith.crypto_trading_platform.model.PaymentDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentDetailsRepository extends JpaRepository<PaymentDetails,Long> {
    PaymentDetails findByUserId(Long userId);
}
