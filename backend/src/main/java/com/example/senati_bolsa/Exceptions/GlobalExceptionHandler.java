package com.example.senati_bolsa.Exceptions;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.senati_bolsa.Dtos.Api.ApiResponseError;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponseError> handleRuntimeException(RuntimeException e){
        ApiResponseError response = new ApiResponseError(false, e.getMessage(), LocalDateTime.now());
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponseError> handleBadCredentialsException(BadCredentialsException e){
        ApiResponseError response = new ApiResponseError(false, "Credenciales inválidas", LocalDateTime.now());
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponseError> handleException(Exception e){
        ApiResponseError response = new ApiResponseError(false, "Error interno del servidor", LocalDateTime.now());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
