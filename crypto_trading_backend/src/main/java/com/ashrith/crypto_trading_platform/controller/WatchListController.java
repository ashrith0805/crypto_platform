package com.ashrith.crypto_trading_platform.controller;

import com.ashrith.crypto_trading_platform.model.Coin;
import com.ashrith.crypto_trading_platform.model.User;
import com.ashrith.crypto_trading_platform.model.WatchList;
import com.ashrith.crypto_trading_platform.services.CoinService;
import com.ashrith.crypto_trading_platform.services.UserService;
import com.ashrith.crypto_trading_platform.services.WatchListService;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/watchlist")
public class WatchListController {
    @Autowired
     WatchListService watchlistService;
    @Autowired
     UserService userService;

    @Autowired
    private CoinService coinService;



    @GetMapping("/user")
    public ResponseEntity<WatchList> getUserWatchlist(
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user=userService.findUserProfileByJwt(jwt);
        WatchList watchlist = watchlistService.findUserWatchList(user.getId());
        return ResponseEntity.ok(watchlist);

    }

    @PostMapping("/create")
    public ResponseEntity<WatchList> createWatchlist(
            @RequestHeader("Authorization") String jwt) throws  Exception {
        User user=userService.findUserProfileByJwt(jwt);
        WatchList createdWatchlist = watchlistService.createWatchList(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdWatchlist);
    }

    @GetMapping("/{watchlistId}")
    public ResponseEntity<WatchList> getWatchlistById(
            @PathVariable Long watchlistId) throws Exception {

        WatchList watchlist = watchlistService.findById(watchlistId);
        return ResponseEntity.ok(watchlist);

    }

    @PatchMapping("/add/coin/{coinId}")
    public ResponseEntity<WatchList> addItemToWatchlist(
            @RequestHeader("Authorization") String jwt,
            @PathVariable String coinId) throws Exception {
        User user=userService.findUserProfileByJwt(jwt);
        Coin coin=coinService.findById(coinId);
        watchlistService.addItemToWatchlist(coin, user);
        return ResponseEntity.ok(watchlistService.findUserWatchList(user.getId()));
    }


    @PatchMapping("/remove/coin/{coinId}")
    public ResponseEntity<WatchList> removeItemFromWatchList(@RequestHeader("Authorization") String jwt, @PathVariable String coinId) throws Exception {
        User user=userService.findUserProfileByJwt(jwt);
        Coin coin=coinService.findById(coinId);
        watchlistService.removeItemFromWatchList(coin,user);
       return new ResponseEntity<>(watchlistService.findUserWatchList(user.getId()),HttpStatus.OK);
    }
}
