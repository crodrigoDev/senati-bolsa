package com.example.senati_bolsa.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.senati_bolsa.Repositories.UsuarioRepository;

import java.util.List;
import java.util.Map;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository repo;

    public List<Map<String, Object>> obtenerPerfil(Integer id) {
        return repo.obtenerPerfilPorId(id);
    }

    public void actualizarPerfil(Integer id, String nombres, String apellidos, String numero, String fotoUrl) {
        repo.actualizarPerfil(id, nombres, apellidos, numero, fotoUrl);
    }

    public void cambiarPassword(Integer id, String nuevaPass) {
        repo.actualizarPassword(id, nuevaPass);
    }
}
