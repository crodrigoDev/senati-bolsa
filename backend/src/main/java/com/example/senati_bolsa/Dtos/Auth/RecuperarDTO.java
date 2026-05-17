package com.example.senati_bolsa.Dtos.Auth;

public class RecuperarDTO{
    public static record ForgotPasswordRequestDTO(
        String email
    ) {}

    public static record VerifyCodeRequestDTO(
        String email,
        String codigo
    ) {}

    public static record CambiarPasswordRequestDTO(
        String email,
        String nuevaPassword
    ) {}
}


