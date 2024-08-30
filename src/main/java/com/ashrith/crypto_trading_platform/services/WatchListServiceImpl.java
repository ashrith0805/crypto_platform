package com.ashrith.crypto_trading_platform.services;

import com.ashrith.crypto_trading_platform.model.Coin;
import com.ashrith.crypto_trading_platform.model.User;
import com.ashrith.crypto_trading_platform.model.WatchList;
import com.ashrith.crypto_trading_platform.repository.UserRepository;
import com.ashrith.crypto_trading_platform.repository.WatchListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WatchListServiceImpl implements   WatchListService{
    @Autowired
    WatchListRepository watchListRepository;
    @Autowired
    UserRepository userRepository;

    @Override
    public WatchList findUserWatchList(Long userId) throws Exception {
        WatchList list=watchListRepository.findByUserId(userId);
        if(list==null){
            return createWatchList(userRepository.findById(userId).get());
        }
        return list;
    }

    @Override
    public WatchList createWatchList(User user) {
        WatchList watchList=new WatchList();
        watchList.setUser(user);
        return watchListRepository.save(watchList);
    }

    @Override
    public WatchList findById(Long id) throws Exception {
        Optional<WatchList> list=watchListRepository.findById(id);
        if(list.isEmpty()) throw new Exception("WatchList not found");
        return list.get();
    }

    @Override
    public Coin addItemToWatchlist(Coin coin, User user) throws Exception {
        WatchList list=findUserWatchList(user.getId());
        List<Coin> coins=list.getCoins();
        coins.removeIf(c -> c.getId().equals(coin.getId()));
        list.getCoins().add(coin);
         watchListRepository.save(list);
         return coin;
    }

    @Override
    public List<Coin> removeItemFromWatchList(Coin coin, User user) throws Exception {
        WatchList list=findUserWatchList(user.getId());
        list.getCoins().removeIf(c -> c.getId().equals(coin.getId()));
        watchListRepository.save(list);
        return list.getCoins();
    }
}
