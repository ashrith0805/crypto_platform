package com.ashrith.crypto_trading_platform.repository;

import com.ashrith.crypto_trading_platform.model.Withdrawl;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WithdrawlRepository  extends JpaRepository<Withdrawl,Long> {

    List<Withdrawl> findByUserId(Long userId);
}
