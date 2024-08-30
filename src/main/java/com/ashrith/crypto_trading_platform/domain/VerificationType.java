package com.ashrith.crypto_trading_platform.domain;

import lombok.Data;


public enum VerificationType {
    EMAIL("EMAIL"),

    PHONE("PHONE");
    private String value;

    VerificationType(String value) {
     this.value = value;
    }

    public String getValue() {
        return value;
    }

}
