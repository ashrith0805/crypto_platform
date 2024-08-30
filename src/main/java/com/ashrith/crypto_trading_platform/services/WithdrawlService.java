package com.ashrith.crypto_trading_platform.services;

import com.ashrith.crypto_trading_platform.model.User;
import com.ashrith.crypto_trading_platform.model.Withdrawl;
import java.util.List;
public interface WithdrawlService {

    Withdrawl reuqestWithdrawl(Long amount, User user) throws Exception;

    Withdrawl processWithdrawl(Long id, boolean accepted) throws Exception;

    List<Withdrawl> getUsersWithdrawlHistory(User user);

    List<Withdrawl> getAllWithdrawlRequests();



}
