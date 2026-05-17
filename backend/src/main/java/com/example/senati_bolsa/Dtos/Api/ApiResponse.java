package com.example.senati_bolsa.Dtos.Api;

public record ApiResponse<T>(
    Boolean success,
    String message,
    T data
) {}
