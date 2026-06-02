package com.example.senati_bolsa.Services;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.senati_bolsa.Enums.UsuarioEstado;
import com.example.senati_bolsa.Models.Usuario;
import com.example.senati_bolsa.Repositories.UsuarioRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        boolean habilitado = usuario.getEstado() == UsuarioEstado.ACTIVO;
        boolean noBloqueado = usuario.getEstado() != UsuarioEstado.BLOQUEADO;

        return User.withUsername(usuario.getEmail())
                .password(usuario.getPassword())
                .disabled(!habilitado)
                .accountLocked(!noBloqueado)
                .authorities(Arrays.asList(new SimpleGrantedAuthority(usuario.getRol().getNombre())))
                .build();
    }
    
}
