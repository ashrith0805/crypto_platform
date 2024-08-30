package com.ashrith.crypto_trading_platform.repository;

import com.ashrith.crypto_trading_platform.model.WatchList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WatchListRepository extends JpaRepository<WatchList,Long> {
    WatchList findByUserId(Long id);
}
