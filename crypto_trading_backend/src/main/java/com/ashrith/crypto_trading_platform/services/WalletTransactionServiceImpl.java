package com.ashrith.crypto_trading_platform.services;

import com.ashrith.crypto_trading_platform.domain.WalletTransactionType;
import com.ashrith.crypto_trading_platform.model.Wallet;
import com.ashrith.crypto_trading_platform.model.WalletTransaction;
import com.ashrith.crypto_trading_platform.repository.WalletTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class WalletTransactionServiceImpl implements WalletTransactionService{
    @Autowired
    WalletTransactionRepository walletTransactionRepository;
    @Override
    public WalletTransaction createWalletTransaction(Wallet wallet, WalletTransactionType type, String transferId, String purpose, long amount) {
        WalletTransaction transaction=new WalletTransaction();
        transaction.setWallet(wallet);
        transaction.setType(type);
        transaction.setPurpose(purpose);
        transaction.setDate(LocalDate.now());
        transaction.setAmount(amount);
        return walletTransactionRepository.save(transaction);
    }

    @Override
    public List<WalletTransaction> getTransactions(Wallet wallet) {
        return walletTransactionRepository.findByWalletOrderByDateDesc(wallet);
    }
}
