package com.example.senati_bolsa.Config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.example.senati_bolsa.Services.CustomUserDetailsService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final CustomUserDetailsService userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(PasswordEncoder passwordEncoder){
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder);
        return new ProviderManager(List.of(authProvider));
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors(cors -> cors.configurationSource(request -> {
                    var config = new org.springframework.web.cors.CorsConfiguration();
                    config.setAllowedOrigins(java.util.List.of("http://localhost:3000"));
                    config.setAllowedMethods(java.util.List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    config.setAllowedHeaders(java.util.List.of("Origin", "Content-Type", "Accept", "Authorization"));
                    config.setAllowCredentials(true);
                    return config;
                }))
                .csrf(c -> c.disable())
                .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests( auth -> auth
                    .requestMatchers("/api/auth/login", "/api/auth/forgot-password", "/api/auth/verify-code", "/api/auth/reset-password", "/api/empresas/**").permitAll()
                    .requestMatchers("/api/perfil/**").permitAll()
                    .requestMatchers("/api/auth/logout").authenticated()
                    .anyRequest().authenticated()
                )
                .logout(l -> l
                    .logoutUrl("/api/auth/logout")
                    .deleteCookies("AUTH-TOKEN")
                    .clearAuthentication(true)
                    .invalidateHttpSession(true)
                    .logoutSuccessHandler((request, response, authentication) -> {
                        response.setStatus(HttpStatus.NO_CONTENT.value());
                    })
                )
                .build();
    }
}
