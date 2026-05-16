package com.example.senati_bolsa.controller;

import com.example.senati_bolsa.model.Usuario;
import com.example.senati_bolsa.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/perfil")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PerfilController {

    private final UsuarioService usuarioService;

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> obtenerPerfil(@PathVariable Integer id) {
        return ResponseEntity.ok(usuarioService.obtenerPerfil(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> actualizarPerfil(@PathVariable Integer id, @RequestBody Usuario usuario) {
        try {
            usuarioService.actualizarPerfil(id, usuario);
            return ResponseEntity.ok("Perfil actualizado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al actualizar perfil: " + e.getMessage());
        }
    }

    @PutMapping("/{id}/password")
    public ResponseEntity<String> cambiarPassword(@PathVariable Integer id,
            @RequestBody Map<String, String> passwords) {
        try {
            String actual = passwords.get("passwordActual");
            String nueva = passwords.get("passwordNueva");
            usuarioService.cambiarPassword(id, actual, nueva);
            return ResponseEntity.ok("Contraseña actualizada correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al cambiar contraseña: " + e.getMessage());
        }
    }
}
