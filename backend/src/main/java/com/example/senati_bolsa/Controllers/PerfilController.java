package com.example.senati_bolsa.controller;

import com.example.senati_bolsa.model.Usuario;
import com.example.senati_bolsa.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/perfil")
@CrossOrigin(origins = "*")
public class PerfilController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/{id}")
    public List<Map<String, Object>> obtenerPerfil(@PathVariable("id") Integer id) {
        return usuarioService.obtenerPerfil(id);
    }

    @PutMapping("/{id}")
    public void actualizarPerfil(@PathVariable("id") Integer id, @RequestBody Usuario usuario) {
        usuarioService.actualizarPerfil(
                id,
                usuario.getNombres(),
                usuario.getApellidos(),
                usuario.getNumero(),
                usuario.getFotoUrl()
        );
    }

    @PostMapping("/cambiar_pass")
    public void cambiarPassword(@RequestBody Map<String, String> datos) {
        Integer id = Integer.parseInt(datos.get("id"));
        String nuevaPass = datos.get("nueva_pass");
        usuarioService.cambiarPassword(id, nuevaPass);
    }
}
