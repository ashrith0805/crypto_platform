package com.ashrith.crypto_trading_platform.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class JwtTokenValidator extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwt = request.getHeader(JwtConstant.jwt_header);
        if(jwt!=null) {
            jwt=jwt.substring(7);


            try {

                SecretKey key= Keys.hmacShaKeyFor(JwtConstant.Secret_Key.getBytes());

                Claims claims=Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();

                String email=String.valueOf(claims.get("email"));

                String authorities=String.valueOf(claims.get("authorities"));

                System.out.println("authorities -------- "+authorities);

                List<GrantedAuthority> auths=AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);
                Authentication authentication=new UsernamePasswordAuthenticationToken(email,null, auths);

                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (Exception e) {
                throw new AuthenticationServiceException("invalid token...");
            }
        }
        filterChain.doFilter(request, response);
        }
        /*Validate http requests using jwt. Jwt is extracted from the header and then prefix removed.
        Secret key is generated using secret key is jwt constaint class to validate the jwt signature
        JWt is parsed to exract the payloard more specifically the claims if any data has been tampered with an
        exception is thrown. Email and authorities are extracted whcih represent the authenticated userrs
        email and their roles/permissions. An authentication objected is created used to represent
        the users authentication status. Store it in the security context marking the user as validated

         */

    }

