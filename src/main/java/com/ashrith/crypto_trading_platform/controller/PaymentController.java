package com.ashrith.crypto_trading_platform.controller;

import com.ashrith.crypto_trading_platform.model.PaymentOrder;
import com.ashrith.crypto_trading_platform.model.User;
import com.ashrith.crypto_trading_platform.response.PaymentResponse;
import com.ashrith.crypto_trading_platform.services.PaymentService;
import com.ashrith.crypto_trading_platform.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PaymentController {

    @Autowired
    UserService userService;

    @Autowired
    PaymentService paymentService;

    @PostMapping("/payment/amount/{amount}")
    public ResponseEntity<PaymentResponse> paymentHandler(
            @PathVariable Long amount,@RequestHeader("Authorization") String jwt
    ) throws Exception{
        User user=userService.findUserProfileByJwt(jwt);
        PaymentOrder order=paymentService.createOrder(user,amount);
       PaymentResponse response= paymentService.createStripePaymentLink(user,amount, order.getId());
       return new ResponseEntity<>(response, HttpStatus.CREATED);
    }




}
