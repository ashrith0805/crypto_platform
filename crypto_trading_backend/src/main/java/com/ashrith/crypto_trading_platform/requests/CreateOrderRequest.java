package com.ashrith.crypto_trading_platform.requests;

import com.ashrith.crypto_trading_platform.domain.OrderType;
import lombok.Data;

@Data
public class CreateOrderRequest {
    private String coinId;
    private double quantity;
    private OrderType orderType;
}
