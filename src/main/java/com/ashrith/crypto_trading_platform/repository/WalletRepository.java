package com.ashrith.crypto_trading_platform.repository;

import com.ashrith.crypto_trading_platform.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ashrith.crypto_trading_platform.model.Wallet;

import java.util.Optional;

public interface WalletRepository extends JpaRepository<Wallet,Long> {

    Optional<Wallet> findByUserId(Long userId);



}
