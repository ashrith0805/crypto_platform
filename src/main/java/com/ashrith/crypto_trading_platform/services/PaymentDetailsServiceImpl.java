package com.ashrith.crypto_trading_platform.services;

import com.ashrith.crypto_trading_platform.model.PaymentDetails;
import com.ashrith.crypto_trading_platform.model.User;
import com.ashrith.crypto_trading_platform.repository.PaymentDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

@Service
public class PaymentDetailsServiceImpl implements PaymentDetailsService {
    @Autowired
    private PaymentDetailsRepository paymentDetailsRepository;
    @Override
    public PaymentDetails addPaymentDetails(String accountNumber, String accountHolderName, String bankName, User user) {
        PaymentDetails details=new PaymentDetails();
        details.setAccountNumber(accountNumber);
        details.setAccountHolderName(accountHolderName);
        details.setBankName(bankName);
        details.setUser(user);
        return paymentDetailsRepository.save(details);
    }

    @Override
    public PaymentDetails getUsersPaymentDetails(User user) {
        return paymentDetailsRepository.findByUserId(user.getId());
    }
}
