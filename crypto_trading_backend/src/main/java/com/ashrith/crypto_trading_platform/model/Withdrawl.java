package com.ashrith.crypto_trading_platform.model;

import com.ashrith.crypto_trading_platform.domain.WithdrawlStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class Withdrawl {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private WithdrawlStatus status;

    private Long amount;

    @ManyToOne
    private User user;

    private LocalDateTime date=LocalDateTime.now();

}
