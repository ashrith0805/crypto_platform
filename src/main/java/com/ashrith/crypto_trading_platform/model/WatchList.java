package com.ashrith.crypto_trading_platform.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class WatchList {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    @JoinColumn(name="user_id")
    private User user;

    @ManyToMany
    private List<Coin > coins=new ArrayList<>();
    /*A single coin can appear on multiple watchlists
    and a single watchlist can contain many coins
     */


}
