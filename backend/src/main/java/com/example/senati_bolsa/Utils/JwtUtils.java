package com.example.senati_bolsa.Utils;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;

@Component
public class JwtUtils {
    
    private final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    private final int EXPIRATION_TIME = 86400000;

    public String generarToken(String email, String rol){
        return Jwts.builder()
                .setSubject(email)
                .claim("role", rol)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + EXPIRATION_TIME))
                .signWith(SECRET_KEY)
                .compact();
    }

    public Cookie crearJwtCookie(String token){
        Cookie cookie = new Cookie("AUTH-TOKEN", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(EXPIRATION_TIME / 1000);
        return cookie;
    }

    public String extraerEmail(String token){
        return extraerTodosLosClaims(token).getSubject();
    }

    public boolean validarToken(String token, String email){
        final String tokenEmail = extraerEmail(token);
        return (tokenEmail.equals(email) && !extraerTodosLosClaims(token).getExpiration().before(new Date()));
    }


    private Claims extraerTodosLosClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
