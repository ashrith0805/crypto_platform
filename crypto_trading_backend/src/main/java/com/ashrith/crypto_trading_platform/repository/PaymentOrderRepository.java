package com.ashrith.crypto_trading_platform.repository;

import com.ashrith.crypto_trading_platform.model.PaymentOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentOrderRepository extends JpaRepository<PaymentOrder, Long> {
}
