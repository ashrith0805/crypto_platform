package com.ashrith.crypto_trading_platform.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private Coin coin;
    /*
    Multiple assets can have the same coin foreign key
     */
    @ManyToOne
    private User user;

    private double quantity;

    private double buyPrice;

    private double sellPrice=0;


}
