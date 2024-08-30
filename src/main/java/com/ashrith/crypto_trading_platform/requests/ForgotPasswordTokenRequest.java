package com.ashrith.crypto_trading_platform.requests;

import com.ashrith.crypto_trading_platform.domain.VerificationType;
import lombok.Data;

@Data
public class ForgotPasswordTokenRequest {
    private String sendTo;
    private String verificationType;
}
