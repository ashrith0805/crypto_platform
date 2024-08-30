package com.ashrith.crypto_trading_platform.services;

import com.ashrith.crypto_trading_platform.model.PaymentDetails;
import com.ashrith.crypto_trading_platform.model.User;

public interface PaymentDetailsService {
    public PaymentDetails addPaymentDetails(String accountNumber,String
                                            accountHolderName, String bankName, User user);
    PaymentDetails getUsersPaymentDetails(User user);
}
