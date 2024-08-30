package com.ashrith.crypto_trading_platform.model;

import com.ashrith.crypto_trading_platform.domain.PaymentOrderStatus;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class PaymentOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long amount;

    private PaymentOrderStatus status;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
}
