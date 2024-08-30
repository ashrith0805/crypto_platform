package com.ashrith.crypto_trading_platform.controller;


import com.ashrith.crypto_trading_platform.domain.WalletTransactionType;
import com.ashrith.crypto_trading_platform.model.*;
import com.ashrith.crypto_trading_platform.repository.WalletRepository;
import com.ashrith.crypto_trading_platform.response.PaymentResponse;
import com.ashrith.crypto_trading_platform.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wallet")
public class WalletController {

    @Autowired
    private PaymentService paymentService;
    @Autowired
    private WalletService walletService;
    @Autowired
    private UserService userService;
    @Autowired
    private WalletTransactionService walletTransactionService;

    @Autowired
    private OrderService orderService;


    @GetMapping
    public ResponseEntity<Wallet> getUserWallet(@RequestHeader("Authorization") String jwt) throws Exception {
        User user=userService.findUserProfileByJwt(jwt);
        Wallet walllet=walletService.getUserWallet(user);
        return new ResponseEntity<>(walllet, HttpStatus.OK);
    }

    @PutMapping("{walletId}/transfer")
    public ResponseEntity<Wallet> walletToWalletTransfer(@RequestHeader("Authorization") String jwt, @PathVariable  Long walletId, @RequestBody WalletTransaction  transaction) throws Exception{
        User sendUser=userService.findUserProfileByJwt(jwt);
        Wallet reciever=walletService.findWalletById(walletId);
       Wallet updated= walletService.walletToWalletTransfer(sendUser,reciever,transaction.getAmount());
        WalletTransaction t=walletTransactionService.createWalletTransaction(updated, WalletTransactionType.WALLET_TRANSFER, String.valueOf(reciever.getId()),transaction.getPurpose(),-transaction.getAmount());
       return new ResponseEntity<>(updated,HttpStatus.ACCEPTED);
    }

    @PutMapping("/order/{orderId}/pay")
    public ResponseEntity<Wallet> payOrderPayment(@RequestHeader("Authorization") String jwt, @PathVariable  Long orderId) throws Exception{
       User user=userService.findUserProfileByJwt(jwt);
       Order order=orderService.getOrderById(orderId);
       Wallet wallet=walletService.payOrderPayment(order,user);
       return new ResponseEntity<>(wallet,HttpStatus.ACCEPTED);
    }

    @PutMapping("/deposit")
    public ResponseEntity<Wallet>addMoneyToWallet(@RequestHeader("Authorization") String jwt,@RequestParam(name="order_id") Long orderId) throws Exception{
        User user=userService.findUserProfileByJwt(jwt);
        Wallet wallet=walletService.getUserWallet(user);
        PaymentOrder order=paymentService.getPaymentOrderById(orderId);
        if(paymentService.proceedPaymentOrder(order)){
            walletService.addBalance(wallet,order.getAmount());
        }
        return new ResponseEntity<>(wallet,HttpStatus.OK);
    }
    @GetMapping("/transactions")
    public ResponseEntity<List<WalletTransaction>> getTransactions(@RequestHeader ("Authorization") String jwt) throws Exception {
        Wallet wallet=walletService.getUserWallet(userService.findUserProfileByJwt(jwt));
        List<WalletTransaction> transaction=walletTransactionService.getTransactions(wallet);
        return new ResponseEntity<>(transaction,HttpStatus.OK);
    }









}
