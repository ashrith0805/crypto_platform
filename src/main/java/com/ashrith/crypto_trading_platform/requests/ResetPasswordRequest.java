package com.ashrith.crypto_trading_platform.requests;


import lombok.Data;

//class that contains the fields the are required and that will be updated during password change
@Data
public class ResetPasswordRequest {
    private String otp;
    private String password;
}
