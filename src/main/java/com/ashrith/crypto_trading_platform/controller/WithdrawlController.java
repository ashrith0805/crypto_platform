package com.ashrith.crypto_trading_platform.controller;

import com.ashrith.crypto_trading_platform.domain.WalletTransactionType;
import com.ashrith.crypto_trading_platform.model.User;
import com.ashrith.crypto_trading_platform.model.Wallet;
import com.ashrith.crypto_trading_platform.model.WalletTransaction;
import com.ashrith.crypto_trading_platform.model.Withdrawl;
import com.ashrith.crypto_trading_platform.services.UserService;
import com.ashrith.crypto_trading_platform.services.WalletService;
import com.ashrith.crypto_trading_platform.services.WalletTransactionService;
import com.ashrith.crypto_trading_platform.services.WithdrawlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class WithdrawlController {

    @Autowired
    private WithdrawlService withdrawalService;

    @Autowired
    private WalletService walletService;

    @Autowired
    private UserService userService;

    @Autowired
    private WalletTransactionService walletTransactionService;

    @PostMapping("/api/withdrawal/{amount}")
    public ResponseEntity<?> withdrawalRequest(
            @PathVariable Long amount,
            @RequestHeader("Authorization")String jwt) throws Exception {
        User user=userService.findUserProfileByJwt(jwt);
        Wallet userWallet=walletService.getUserWallet(user);
        Withdrawl withdrawl=withdrawalService.reuqestWithdrawl(amount,user);
        WalletTransaction walletTransaction = walletTransactionService.createWalletTransaction(
                userWallet,
                WalletTransactionType.WITHDRAWAL,null,
                "bank account withdrawal",
                withdrawl.getAmount()
        );

        return new ResponseEntity<>(withdrawl, HttpStatus.OK);
    }

    /*
    use put mapping and patch mapping both for updating a resource
    however put is used when you want to replace a resource entirely or overwrite it
    patch is used for partial updates only. in patch only the resources that are required to be
    updates are sent rather than the whole resource
     */
    @PatchMapping("/api/admin/withdrawal/{id}/proceed/{accept}")
    public ResponseEntity<?> proceedWithdrawal(
            @PathVariable Long id,
            @PathVariable boolean accept,
            @RequestHeader("Authorization")String jwt) throws Exception {
        User user=userService.findUserProfileByJwt(jwt);

        Withdrawl withdrawl=withdrawalService.processWithdrawl(id,accept);

        Wallet userWallet=walletService.getUserWallet(user);
        if(accept){
            walletService.addBalance(userWallet, -withdrawl.getAmount());
        }

        return new ResponseEntity<>(withdrawl, HttpStatus.OK);
    }

    @GetMapping("/api/withdrawal")
    public ResponseEntity<List<Withdrawl>> getWithdrawalHistory(

            @RequestHeader("Authorization")String jwt) throws Exception {
        User user=userService.findUserProfileByJwt(jwt);

        List<Withdrawl> withdrawal=withdrawalService.getUsersWithdrawlHistory(user);

        return new ResponseEntity<>(withdrawal, HttpStatus.OK);
    }

    @GetMapping("/api/admin/withdrawal")
    public ResponseEntity<List<Withdrawl>> getAllWithdrawalRequest(

            @RequestHeader("Authorization")String jwt) throws Exception {


        List<Withdrawl> withdrawl=withdrawalService.getAllWithdrawlRequests();

        return new ResponseEntity<>(withdrawl, HttpStatus.OK);
    }
}

