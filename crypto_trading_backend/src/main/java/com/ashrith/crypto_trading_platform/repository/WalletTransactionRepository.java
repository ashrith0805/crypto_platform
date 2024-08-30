package com.ashrith.crypto_trading_platform.repository;

import com.ashrith.crypto_trading_platform.model.Wallet;
import com.ashrith.crypto_trading_platform.model.WalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WalletTransactionRepository extends JpaRepository<WalletTransaction,Long> {
    List<WalletTransaction> findByWalletOrderByDateDesc(Wallet wallet);

}
