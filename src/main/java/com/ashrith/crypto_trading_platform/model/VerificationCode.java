package com.ashrith.crypto_trading_platform.model;

import com.ashrith.crypto_trading_platform.domain.VerificationType;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class VerificationCode {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String otp;

    @OneToOne
    @JoinColumn(name="userid")
    private User user;

    private String mobile;

    private VerificationType verificationType;
}
