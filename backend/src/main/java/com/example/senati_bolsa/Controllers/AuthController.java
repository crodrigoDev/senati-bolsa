package com.example.senati_bolsa.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.senati_bolsa.Dtos.Api.ApiResponse;
import com.example.senati_bolsa.Dtos.Auth.AuthResponseDTO;
import com.example.senati_bolsa.Dtos.Auth.LoginRequestDTO;
import com.example.senati_bolsa.Dtos.Auth.RecuperarDTO.*;
import com.example.senati_bolsa.Services.AuthService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("login")
    public ResponseEntity<ApiResponse<AuthResponseDTO>> login(@RequestBody LoginRequestDTO request, HttpServletResponse response) {
        AuthResponseDTO responseDTO = authService.login(request, response);
        return ResponseEntity.ok(new ApiResponse<>(
            true,
            "Inicio de sesion exitoso",
            responseDTO
        ));
    }

    @PostMapping("logout")
    public void logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("AUTH-TOKEN", null);
        cookie.setMaxAge(0);
    }

    @PostMapping("forgot-password")
    public ResponseEntity<ApiResponse<String>> forgotPassword(@RequestBody ForgotPasswordRequestDTO request) {
        try{
            authService.procesarSolicitudRecuperacion(request.email());
        }catch(RuntimeException e){
            return ResponseEntity.ok(new ApiResponse<>(
                true,
                "Se envió el código de verificación al correo si es que existe.",
                null
            ));
        }
        return ResponseEntity.ok(new ApiResponse<>(
            true,
            "Se envió el código de verificación al correo si es que existe.",
            null
        ));
    }

    @PostMapping("verify-code")
    public ResponseEntity<ApiResponse<String>> verifyCode(@RequestBody VerifyCodeRequestDTO request) {
        try {
            authService.verificarCodigo(request.email(), request.codigo());
            return ResponseEntity.ok(new ApiResponse<>(
                true,
                "Codigo verificado",
                null
            ));
       } catch(RuntimeException e){
            return ResponseEntity.badRequest().body(new ApiResponse<>(
                false,
                e.getMessage(),
                null
            ));
       }
    }

    @PostMapping("reset-password")
    public ResponseEntity<ApiResponse<String>> resetPassword(@RequestBody CambiarPasswordRequestDTO request) {
        try {
            authService.cambiarPassword(request.email(), request.codigo(), request.nuevaPassword());
            return ResponseEntity.ok(new ApiResponse<>(
                true,
                "Contraseña cambiada correctamente",
                null
            ));
       } catch(RuntimeException e){
            return ResponseEntity.badRequest().body(new ApiResponse<>(
                false,
                e.getMessage(),
                null
            ));
       }
    }
    
    
    
    
}
