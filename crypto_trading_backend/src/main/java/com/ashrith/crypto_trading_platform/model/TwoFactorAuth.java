package com.ashrith.crypto_trading_platform.model;


import com.ashrith.crypto_trading_platform.domain.VerificationType;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import lombok.Data;

@Data
@Embeddable
public class TwoFactorAuth {


    private boolean isEnabled;
    private VerificationType verficationType;
}
