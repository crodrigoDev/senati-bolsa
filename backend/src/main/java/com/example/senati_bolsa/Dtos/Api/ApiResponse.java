package com.example.senati_bolsa.Dtos.Api;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiResponse<T>(
    Boolean success,
    String message,
    T data
) {
    public ApiResponse(Boolean success, String message){
        this(success, message, null);
    }
}
