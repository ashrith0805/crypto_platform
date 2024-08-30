package com.ashrith.crypto_trading_platform.services;

import com.ashrith.crypto_trading_platform.domain.OrderType;
import com.ashrith.crypto_trading_platform.model.Coin;
import com.ashrith.crypto_trading_platform.model.OrderItem;
import com.ashrith.crypto_trading_platform.model.Order;
import com.ashrith.crypto_trading_platform.model.User;

import java.util.List;

public interface OrderService {

    Order createOrder(User user, OrderItem item, OrderType orderType);

    Order getOrderById(Long orderId) throws Exception;

    List<Order> getAllOrdersOfUser(Long userId, String orderType, String assetSymbol);

    Order processOrder(Coin coin, double quantity, OrderType orderType,User user) throws Exception;


}
