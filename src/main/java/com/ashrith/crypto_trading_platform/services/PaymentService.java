package com.ashrith.crypto_trading_platform.services;

import com.ashrith.crypto_trading_platform.model.PaymentOrder;
import com.ashrith.crypto_trading_platform.model.User;
import com.ashrith.crypto_trading_platform.response.PaymentResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {

    PaymentOrder createOrder(User user, Long amount);

    PaymentOrder getPaymentOrderById(Long id) throws Exception;

    boolean proceedPaymentOrder(PaymentOrder order);

    PaymentResponse createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException;

}
