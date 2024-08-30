package com.ashrith.crypto_trading_platform.services;

import com.ashrith.crypto_trading_platform.domain.VerificationType;
import com.ashrith.crypto_trading_platform.model.User;

public interface UserService {

     User findUserProfileByJwt(String jwt) throws Exception;
     User findUserByEmail(String email) throws Exception;

     User findUserById(Long id) throws Exception;

     User enableTwoFactorAuthentication(VerificationType verificationType, User user, String sendTo);

    User updatePassword(User user, String newPassword);




}
