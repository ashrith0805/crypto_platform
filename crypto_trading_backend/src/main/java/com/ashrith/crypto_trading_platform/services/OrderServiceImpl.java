package com.ashrith.crypto_trading_platform.services;

import com.ashrith.crypto_trading_platform.domain.OrderStatus;
import com.ashrith.crypto_trading_platform.domain.OrderType;
import com.ashrith.crypto_trading_platform.model.*;
import com.ashrith.crypto_trading_platform.repository.OrderItemRepository;
import com.ashrith.crypto_trading_platform.repository.OrderRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService{
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    WalletService walletService;

    @Autowired
    OrderItemRepository orderItemRepository;

    @Autowired
    private AssetService assetService;
    @Override
    public Order createOrder(User user, OrderItem item, OrderType orderType) {
        Order order=new Order();
        order.setOrderType(orderType);
        order.setOrderItem(item);
        order.setUser(user);
        order.setTimestamp(LocalDateTime.now());
        order.setPrice(BigDecimal.valueOf(item.getCoin().getCurrentPrice()*item.getQuantity()));
        return orderRepository.save(order);
    }

    @Override
    public Order getOrderById(Long orderId) throws Exception {
        return orderRepository.findById(orderId).orElseThrow(()->new Exception("Order not found"));

    }

    @Override
    public List<Order> getAllOrdersOfUser(Long userId, String orderType, String assetSymbol) {
        return orderRepository.findByUserId(userId);
    }

    private OrderItem createOrderItem(Coin coin, double quantity, double buyPrice, double sellPrice){
        OrderItem item=new OrderItem();
        item.setCoin(coin);
        item.setQuantity(quantity);
        item.setBuyPrice(buyPrice);
        item.setSellPrice(sellPrice);
        return orderItemRepository.save(item);
    }

    /*
    transactional annotation manages transactions only commiting them if the method completes
    succesfull else it rolls them back eg we can only buy something if ebery reuqiremnt met.
     */

    @Transactional
    public Order buyAsset(Coin coin,double quantity, User user) throws Exception {
        if(quantity<=0) throw new Exception("Can not buy less than 0 units");
        double buyPrice=coin.getCurrentPrice();
        OrderItem item=createOrderItem(coin,quantity,buyPrice,0);
        Order order=createOrder(user,item,OrderType.BUY);
        item.setOrders(order);
        walletService.payOrderPayment(order,user);
        order.setStatus(OrderStatus.SUCCESS);
        Asset oldAsset=assetService.findAssetByUserIdAndCoinId(user.getId(),coin.getId());
        /*
        Many to one mapping between asset and coin/ users eg many asset records can have the same
        coin and user foreign key. One to one mapping will stop many assets storing the same coin or storing the same
        user however we are not going to allow the duplicate assets held by the same user and coin.
         */
        if(oldAsset!=null){
             assetService.updateAsset(oldAsset.getId(),quantity);
        }
        else{
            assetService.createAsset(user,coin,quantity);
        }
        return orderRepository.save(order);
    }

    @Transactional
    public Order sellAsset(Coin coin,double quantity, User user) throws Exception {
        if(quantity<=0) throw new Exception("Can not buy less than 0 units");
        double sellPrice=coin.getCurrentPrice();
        Asset assetToSell=assetService.findAssetByUserIdAndCoinId(user.getId(), coin.getId()) ;
        if(assetToSell!=null) {
            double buyPrice = assetToSell.getBuyPrice();
            OrderItem item = createOrderItem(coin, quantity, buyPrice, sellPrice);
            Order order = createOrder(user, item, OrderType.SELL);
            item.setOrders(order);
            if (assetToSell.getQuantity() >= quantity) {
                order.setStatus(OrderStatus.SUCCESS);
                order.setOrderType(OrderType.SELL);
                orderRepository.save(order);
                walletService.payOrderPayment(order, user);
                Asset updated = assetService.updateAsset(assetToSell.getId(), -quantity);
                assetService.setSellPrice(assetToSell.getId(),sellPrice);
                return order;
            }
            else throw new Exception("Insufficient quantity to sell");
        }
         throw new Exception("Asset to sell not found");
    }

    @Override
    public Order processOrder(Coin coin, double quantity, OrderType orderType, User user) throws Exception {
        if(orderType.equals(OrderType.BUY)) return buyAsset(coin,quantity,user);
        else return sellAsset(coin,quantity,user);
    }
}
