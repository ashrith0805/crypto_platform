package com.ashrith.crypto_trading_platform.model;


import com.ashrith.crypto_trading_platform.domain.User_Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Embedded
    private TwoFactorAuth twoFactorAuth=new TwoFactorAuth();

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Column(nullable = false,unique = true)
    private String email;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @JsonIgnore
    private Wallet wallet;
    /*
    bidrecitonal relationship can cause infinite recursion when trying to access the
    wallet or user. As when trying to serialize user it has a wallet object which has a user
    object which has a user object and so on
     */

    private User_Role role= User_Role.USER;

}
