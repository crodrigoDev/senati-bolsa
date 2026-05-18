package com.example.senati_bolsa.Dtos.Api;

import java.time.LocalDateTime;

public record ApiResponseError(
    Boolean success,
    String message,
    LocalDateTime timestamp
){}
