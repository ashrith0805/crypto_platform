package com.ashrith.crypto_trading_platform.Utilities;


import java.util.Random;
/*
Strings are immutables after they are created they can not be changed.
A modification of immutable object results in new object being made rather than this one being chnaged
 */
public class OTPUtils {

    public static String generateOTP(){
        int otpLength=6;
        Random random=new Random();
        StringBuilder otp=new StringBuilder(otpLength);
        //string builder allows you to modify the contents of a string without
        // having to creating a new string every time. It is more efficient than
        // when multiple string modificiations need to be done
        for(int i=0;i<otpLength;i++){
            otp.append(random.nextInt(10));
        }
        return otp.toString();
    }
}
