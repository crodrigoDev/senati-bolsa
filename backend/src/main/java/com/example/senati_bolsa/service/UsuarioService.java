package com.example.senati_bolsa.service;

import com.example.senati_bolsa.model.Usuario;
import com.example.senati_bolsa.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public Usuario obtenerPerfil(Integer id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    @Transactional
    public void actualizarPerfil(Integer id, Usuario usuario) {
        usuarioRepository.actualizarPerfil(
                id,
                usuario.getNombres(),
                usuario.getApellidos(),
                usuario.getNumero(),
                usuario.getFotoUrl());
    }

    @Transactional
    public void cambiarPassword(Integer id, String passwordActual, String passwordNueva) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!usuario.getPassword().equals(passwordActual)) {
            throw new RuntimeException("La contraseña actual es incorrecta");
        }

        usuarioRepository.actualizarPassword(id, passwordNueva);
    }
}
