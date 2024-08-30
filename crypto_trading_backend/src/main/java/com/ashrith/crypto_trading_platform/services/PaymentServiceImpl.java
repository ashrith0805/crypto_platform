package com.ashrith.crypto_trading_platform.services;

import com.ashrith.crypto_trading_platform.domain.PaymentOrderStatus;
import com.ashrith.crypto_trading_platform.model.PaymentOrder;
import com.ashrith.crypto_trading_platform.model.User;

import com.ashrith.crypto_trading_platform.repository.PaymentOrderRepository;
import com.ashrith.crypto_trading_platform.response.PaymentResponse;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import static com.stripe.param.billingportal.SessionCreateParams.*;

@Service
public class PaymentServiceImpl implements  PaymentService{

    @Autowired
    private PaymentOrderRepository paymentOrderRepository;


    /* inject the key from the application proeprties file into this field
    Used to authenticate payemnts with stripe servers
     */
    @Value("${stripe.api.key}")
    private String stripeSecretKey;

    @Override
    public PaymentOrder createOrder(User user, Long amount) {
        PaymentOrder order=new PaymentOrder();
        order.setAmount(amount);
        order.setUser(user);
        order.setStatus(PaymentOrderStatus.PENDING);
        return paymentOrderRepository.save(order);
    }

    @Override
    public PaymentOrder getPaymentOrderById(Long id) throws Exception {
        return paymentOrderRepository.findById(id).orElseThrow(
                ()->new Exception("Payment order not found")
        );
    }

    @Override
    public boolean proceedPaymentOrder(PaymentOrder order) {
       if(order.getStatus().equals(PaymentOrderStatus.PENDING)){
            order.setStatus(PaymentOrderStatus.SUCCESS);
            paymentOrderRepository.save(order);
            return true;
       }
       return false;
    }

    @Override
    public PaymentResponse createStripePaymentLink(User user, Long amount,Long orderId) throws StripeException {
        Stripe.apiKey = stripeSecretKey;

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:5173/wallet?order_id="+orderId)
                .setCancelUrl("http://localhost:8080/wallet/cancel")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("usd")
                                .setUnitAmount(amount*100)
                                .setProductData(SessionCreateParams
                                        .LineItem
                                        .PriceData
                                        .ProductData
                                        .builder()
                                        .setName("Top up wallet")
                                        .build()
                                ).build()
                        ).build()
                ).build();

        Session session = Session.create(params);

        System.out.println("session _____ " + session);

        PaymentResponse res = new PaymentResponse();
        res.setPaymentUrl(session.getUrl());
        /*where users are redirected to in order to complete the payment
        basically just configuring all the payment details so far

         */

        return res;
    }
}

