package com.ashrith.crypto_trading_platform.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class TwoFactorOTP {

    @Id
    private String id;

    private String otp;

    //Write only annotations ensure that this field will only be included in deserializatipn
    //eg covnerting from Json to object and not the other way round. Tells the json library
    // that this field should only be populated from JSON data when receving it from api requests.
    // It should not be included in the JSON representation when response is sent. Protects sensitive information
    @OneToOne
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private User user;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String jwt;


}
