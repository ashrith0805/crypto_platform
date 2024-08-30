package com.ashrith.crypto_trading_platform.model;
import com.ashrith.crypto_trading_platform.domain.VerificationType;
import com.ashrith.crypto_trading_platform.model.User;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ForgotPasswordToken {
    @Id
    private String id;

    @OneToOne
    @JoinColumn(name="user_id")
    private User user;

    private String otp;

    private String verificationType;

    private String sendTo;
}
