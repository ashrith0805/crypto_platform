package com.ashrith.crypto_trading_platform.services;

import com.ashrith.crypto_trading_platform.domain.WalletTransactionType;
import com.ashrith.crypto_trading_platform.model.Wallet;
import com.ashrith.crypto_trading_platform.model.WalletTransaction;

import java.util.List;

public interface WalletTransactionService {
    WalletTransaction createWalletTransaction(Wallet wallet, WalletTransactionType type, String transferId, String purpose,long amount);

    List<WalletTransaction> getTransactions(Wallet wallet);
}
