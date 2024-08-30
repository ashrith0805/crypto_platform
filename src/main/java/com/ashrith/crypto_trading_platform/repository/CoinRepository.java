package com.ashrith.crypto_trading_platform.repository;
import com.ashrith.crypto_trading_platform.model.Coin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoinRepository extends JpaRepository<Coin,String> {

}
