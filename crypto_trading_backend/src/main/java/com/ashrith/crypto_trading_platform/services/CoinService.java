package com.ashrith.crypto_trading_platform.services;
import com.ashrith.crypto_trading_platform.model.Coin;

import java.util.List;

public interface CoinService {
    List<Coin> getCoinList(int page) throws Exception;
    String getMarketChart(String coinId,int days) throws Exception;
    String getCoinDetails(String coinId) throws Exception;
    Coin findById(String coinId) throws Exception;
    String searchCoin(String keyword) throws Exception;

    String getTo50CoinsByMarketCapRank() throws Exception;
    String GetTrendingCoins() throws Exception;















}
