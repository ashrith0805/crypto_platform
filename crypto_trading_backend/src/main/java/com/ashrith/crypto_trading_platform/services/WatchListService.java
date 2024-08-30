package com.ashrith.crypto_trading_platform.services;

import com.ashrith.crypto_trading_platform.model.Coin;
import com.ashrith.crypto_trading_platform.model.User;
import com.ashrith.crypto_trading_platform.model.WatchList;

import java.util.List;

public interface WatchListService {

    WatchList findUserWatchList(Long userId) throws Exception;

    WatchList createWatchList(User user);

    WatchList findById(Long id) throws Exception;

    Coin addItemToWatchlist(Coin coin, User user) throws Exception;


    List<Coin> removeItemFromWatchList(Coin coin, User user) throws Exception;
}
