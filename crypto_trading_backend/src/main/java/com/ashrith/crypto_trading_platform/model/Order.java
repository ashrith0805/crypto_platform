package com.ashrith.crypto_trading_platform.model;

import com.ashrith.crypto_trading_platform.domain.OrderStatus;
import com.ashrith.crypto_trading_platform.domain.OrderType;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/*
NEVER USE KEYWORDS FOR TABLE NAME. THIS IS FOR THE DATA ASSOCIATED WITH AN ORDER
 */
@Entity
@Data
@Table(name = "purchase_order")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private User user;

    @Column(nullable = false)
    private OrderType orderType;


    private BigDecimal price;

    private LocalDateTime timestamp=LocalDateTime.now();


    @Column(nullable = false)
    private OrderStatus status=OrderStatus.PENDING;


    /*
    The orderItem class holds the foreign key assoicated with this bidirectional relationship.
    The orderItem class must have a field that referecnes the order class for this relationship,
    This field must be annotated with @JoinCloumn to specify the column in the orderitem table that holds
    the link to the order class. Mapped annotation helps manage the owning and inverse side of relationshi[
     */
    @OneToOne(mappedBy = "orders",cascade = CascadeType.ALL)
    private OrderItem orderItem;

}
