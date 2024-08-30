package com.ashrith.crypto_trading_platform.services;

import com.ashrith.crypto_trading_platform.model.Order;
import com.ashrith.crypto_trading_platform.model.User;
import com.ashrith.crypto_trading_platform.model.Wallet;

public interface WalletService {

    Wallet getUserWallet(User user);

    Wallet addBalance(Wallet wallet, Long money);


    Wallet findWalletById(Long id) throws Exception;

    Wallet walletToWalletTransfer(User sender, Wallet reciever, Long amount) throws Exception;

    Wallet payOrderPayment(Order order, User User) throws Exception;


}
