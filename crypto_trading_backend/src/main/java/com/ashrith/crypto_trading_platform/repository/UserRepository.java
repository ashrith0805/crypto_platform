package com.ashrith.crypto_trading_platform.repository;

import com.ashrith.crypto_trading_platform.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
   User findByEmail(String email);

}
