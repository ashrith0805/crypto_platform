package com.ashrith.crypto_trading_platform.repository;

import com.ashrith.crypto_trading_platform.domain.OrderType;
import com.ashrith.crypto_trading_platform.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Long> {

    List<Order> findByUserId(Long userId);

    List<Order> findByUserIdAndOrderType(Long userId, OrderType orderType);


}
