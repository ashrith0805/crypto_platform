package com.ashrith.crypto_trading_platform.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping
    public String home(){
        return "Welcome to the home page of the trading platform";
    }

    @GetMapping("api/v1")
    public String locked(){ return "Hi";};



}
