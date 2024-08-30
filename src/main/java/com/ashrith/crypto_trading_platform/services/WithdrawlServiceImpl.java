package com.ashrith.crypto_trading_platform.services;

import com.ashrith.crypto_trading_platform.domain.WithdrawlStatus;
import com.ashrith.crypto_trading_platform.model.User;
import com.ashrith.crypto_trading_platform.model.Withdrawl;
import com.ashrith.crypto_trading_platform.repository.WalletRepository;
import com.ashrith.crypto_trading_platform.repository.WithdrawlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class WithdrawlServiceImpl implements WithdrawlService {
    @Autowired
    WithdrawlRepository withdrawlRepository;

    @Override
    public Withdrawl reuqestWithdrawl(Long amount, User user) throws Exception {
//        if(user.getWallet().getBalance().compareTo(BigDecimal.valueOf(amount))<0){
//            throw new Exception("Invalid withdrawl, more than account balance");
//        }
        Withdrawl withdrawl=new Withdrawl();
        withdrawl.setAmount(amount);
        withdrawl.setUser(user);
        withdrawl.setStatus(WithdrawlStatus.PENDING);
        return withdrawlRepository.save(withdrawl);
    }

    @Override
    public Withdrawl processWithdrawl(Long withdrawlid, boolean accepted) throws Exception {
        Optional<Withdrawl> withdrawl=withdrawlRepository.findById(withdrawlid);
        if(withdrawl.isEmpty()) throw new Exception("Withdrawl not found");
        Withdrawl withdrawl1=withdrawl.get();
        withdrawl1.setDate(LocalDateTime.now());
        if(accepted) {

            withdrawl1.setStatus(WithdrawlStatus.SUCCESS);
        }
        else{
            withdrawl1.setStatus(WithdrawlStatus.DECLINED);
        }
        return withdrawlRepository.save(withdrawl1);
    }

    @Override
    public List<Withdrawl> getUsersWithdrawlHistory(User user) {
        return withdrawlRepository.findByUserId(user.getId());
    }

    @Override
    public List<Withdrawl> getAllWithdrawlRequests() {
        return withdrawlRepository.findAll();
    }

}
