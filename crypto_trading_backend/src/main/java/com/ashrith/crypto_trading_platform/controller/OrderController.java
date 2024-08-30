package com.ashrith.crypto_trading_platform.controller;

import com.ashrith.crypto_trading_platform.requests.CreateOrderRequest;
import com.ashrith.crypto_trading_platform.model.Coin;
import com.ashrith.crypto_trading_platform.model.Order;
import com.ashrith.crypto_trading_platform.model.User;
import com.ashrith.crypto_trading_platform.services.CoinService;
import com.ashrith.crypto_trading_platform.services.OrderService;
import com.ashrith.crypto_trading_platform.services.UserService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private OrderService orderService;

    private UserService userSerivce;

    @Autowired
    private CoinService coinService;

//    @Autowired
//    private WalletTransactionService walletTransactionService;

//    private

    @Autowired
    public OrderController(OrderService orderService, UserService userSerivce) {
        this.orderService = orderService;
        this.userSerivce=userSerivce;
    }

    @PostMapping("/pay")
    public ResponseEntity<Order> payOrderPayment(
            @RequestHeader("Authorization") String jwt,
            @RequestBody CreateOrderRequest req

    ) throws Exception {
        User user = userSerivce.findUserProfileByJwt(jwt);
        Coin coin =coinService.findById(req.getCoinId());


        Order order = orderService.processOrder(coin,req.getQuantity(),req.getOrderType(),user);

        return ResponseEntity.ok(order);

    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(
            @RequestHeader("Authorization") String jwt,
            @PathVariable Long orderId
    ) throws Exception {
        if (jwt == null) {
            throw new Exception("token missing...");
        }

        User user = userSerivce.findUserProfileByJwt(jwt);

        Order order = orderService.getOrderById(orderId);
        if (order.getUser().getId()==user.getId()) {
            return ResponseEntity.ok(order);
        } else {
            throw new Exception("Invalid user");
        }
    }

    @GetMapping()
    public ResponseEntity<List<Order>> getAllOrdersForUser(
            @RequestHeader("Authorization") String jwtToken,
            @RequestParam(required = false) String order_type,
            @RequestParam(required = false) String asset_symbol
    ) throws Exception {
        if (jwtToken == null) {
            throw new Exception("token missing...");
        }

        Long userId = userSerivce.findUserProfileByJwt(jwtToken).getId();

        List<Order> userOrders = orderService.getAllOrdersOfUser(userId,order_type,asset_symbol);
        return ResponseEntity.ok(userOrders);
    }




}
