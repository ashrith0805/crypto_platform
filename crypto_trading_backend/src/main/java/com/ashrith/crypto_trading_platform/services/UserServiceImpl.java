package com.ashrith.crypto_trading_platform.services;

import com.ashrith.crypto_trading_platform.config.JwtProvider;
import com.ashrith.crypto_trading_platform.domain.VerificationType;
import com.ashrith.crypto_trading_platform.model.TwoFactorAuth;
import com.ashrith.crypto_trading_platform.model.User;
import com.ashrith.crypto_trading_platform.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;
    @Override
    public User findUserProfileByJwt(String jwt) throws Exception {
        String email= JwtProvider.getEmailFromJwtToken(jwt);
        User user =userRepository.findByEmail(email);
        if(user==null) throw new Exception("User Not found");
        return user;
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user =userRepository.findByEmail(email);
        if(user==null) throw new Exception("User Not found");
        return user;
    }

    @Override
    public User findUserById(Long id) throws Exception {
        Optional<User> user =userRepository.findById(id);
        if(user.isEmpty()) throw new Exception("User Not found");
        return user.get();
    }

    @Override
    public User enableTwoFactorAuthentication(VerificationType verificationType, User user, String sendTo) {
        TwoFactorAuth twoFactorAuth=new TwoFactorAuth();
        twoFactorAuth.setEnabled(true);
        twoFactorAuth.setVerficationType(verificationType);
        user.setTwoFactorAuth(twoFactorAuth);
        return userRepository.save(user);
    }


    @Override
    public User updatePassword(User user, String newPassword) {
        user.setPassword(newPassword);
        return userRepository.save(user);
    }
}
