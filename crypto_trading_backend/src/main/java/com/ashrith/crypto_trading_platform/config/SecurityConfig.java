package com.ashrith.crypto_trading_platform.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
public class SecurityConfig {

    @Bean
   public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http.sessionManagement(management->management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(Authorize->Authorize.requestMatchers(("/api/**")).authenticated()
                        .anyRequest().permitAll()).addFilterBefore(new
                        JwtTokenValidator(), BasicAuthenticationFilter.class)
                .csrf(csrf->csrf.disable())
                .cors(cors->cors.configurationSource(corsConfigurationSource()));
        return http.build();
    }

    /*
    cors is a security feature implemented by web browsers to prevent web pages from making requests
    to a different domain than the one that served the webpage. This is known as crossorigin requrst


    When a web page from origin http://localhost:5173 tries to make a request to http://localhost:8080
    the browser blocks the request unless the server at the second origin allows ir
     */



    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cfg = new CorsConfiguration();
        cfg.setAllowedOrigins(Arrays.asList("http://localhost:5173", "http://localhost:3000"));
        cfg.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS","PATCH"));
        cfg.setAllowCredentials(true);
        cfg.setExposedHeaders(Arrays.asList("Authorization"));
        cfg.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        cfg.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cfg);
        return source;
    }
}
