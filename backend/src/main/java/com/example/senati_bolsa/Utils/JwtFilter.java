package com.example.senati_bolsa.Utils;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.senati_bolsa.Services.CustomUserDetailsService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtils jwtUtils;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String token = null;
        String email = null;

        if(request.getCookies() != null){
            for(Cookie cookie: request.getCookies()){
                if("AUTH-TOKEN".equals(cookie.getName())){
                    token = cookie.getValue();
                    break;
                }
            }
        }

        if(token != null && SecurityContextHolder.getContext().getAuthentication() == null){
            try {
                email = jwtUtils.extraerEmail(token);
                if(email != null){
                    UserDetails userDetails = this.userDetailsService.loadUserByUsername(email);

                    if(jwtUtils.validarToken(token, email)){
                        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                        SecurityContextHolder.getContext().setAuthentication(authToken);
                    }
                }
            } catch(Exception e){
                logger.error("Error al procesar la firma del token: " + e.getMessage());
            }
        }
        filterChain.doFilter(request, response);
    }
}
