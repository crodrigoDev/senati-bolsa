package com.example.senati_bolsa.Dtos.Auth;

import com.example.senati_bolsa.Enums.UsuarioEstado;

public record AuthResponseDTO(
    String email,
    String rol,
    String nombres,
    String apellidos,
    UsuarioEstado estado
){}
