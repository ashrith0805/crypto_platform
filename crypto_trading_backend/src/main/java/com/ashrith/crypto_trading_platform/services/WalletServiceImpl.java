package com.ashrith.crypto_trading_platform.services;

import com.ashrith.crypto_trading_platform.domain.OrderType;
import com.ashrith.crypto_trading_platform.model.Order;
import com.ashrith.crypto_trading_platform.model.User;
import com.ashrith.crypto_trading_platform.model.Wallet;
import com.ashrith.crypto_trading_platform.repository.UserRepository;
import com.ashrith.crypto_trading_platform.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class WalletServiceImpl implements WalletService {

    @Autowired
    WalletRepository walletRepository;
    @Autowired
    UserRepository userRepository;

    @Override
    public Wallet getUserWallet(User user)  {
        if(walletRepository.findByUserId(user.getId()).isEmpty()) {
            Wallet wallet=new Wallet();
            wallet.setUser(user);
            wallet.setBalance(BigDecimal.valueOf(0));
//            user.setWallet(wallet);
//            userRepository.save(user);
            return walletRepository.save(wallet);
        }
        return walletRepository.findByUserId(user.getId()).get();
    }

    @Override
    public Wallet addBalance(Wallet wallet, Long money) {
        BigDecimal balance=wallet.getBalance();
        BigDecimal newBalance=balance.add(BigDecimal.valueOf(money));
        wallet.setBalance(newBalance);
        return walletRepository.save(wallet);
    }


    @Override
    public Wallet findWalletById(Long id) throws Exception {
        Optional<Wallet> wallet=walletRepository.findById(id);
        if(wallet.isEmpty()) throw new Exception("wallet not found");
        return wallet.get();
    }

    @Override
    public Wallet walletToWalletTransfer(User sender, Wallet reciever,Long amount) throws Exception {
        Wallet send=getUserWallet(sender);
        if(send.getBalance().compareTo(BigDecimal.valueOf(amount))<0) throw new Exception("Insufficient balance");
        send.setBalance(send.getBalance().subtract(BigDecimal.valueOf(amount)));
        reciever.setBalance(reciever.getBalance().add(BigDecimal.valueOf(amount)));
        walletRepository.save(reciever);
        walletRepository.save(send);
        return send;
    }

    @Override
    public Wallet payOrderPayment(Order order, User user) throws Exception {
        Wallet wallet = getUserWallet(user);
        if (order.getOrderType().equals(OrderType.BUY)) {
            BigDecimal newBalance = wallet.getBalance();
            if (newBalance.compareTo(order.getPrice()) < 0) throw new Exception("Insufficient funds");
            wallet.setBalance(newBalance.subtract(order.getPrice()));
        }
        else{
            BigDecimal newBalance = wallet.getBalance();
            wallet.setBalance(newBalance.add(order.getPrice()));
        }
        return walletRepository.save(wallet);
    }
}
