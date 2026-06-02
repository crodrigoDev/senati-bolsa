package com.example.senati_bolsa.Services;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.senati_bolsa.Dtos.Auth.AuthResponseDTO;
import com.example.senati_bolsa.Dtos.Auth.LoginRequestDTO;
import com.example.senati_bolsa.Enums.CodigoEstado;
import com.example.senati_bolsa.Models.Usuario;
import com.example.senati_bolsa.Models.VerifyCode;
import com.example.senati_bolsa.Repositories.UsuarioRepository;
import com.example.senati_bolsa.Repositories.VerifyCodeRepository;
import com.example.senati_bolsa.Utils.JwtUtils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final VerifyCodeRepository verifyCodeRepository;
    private final UsuarioRepository usuarioRepository;
    private final EmailService emailService;

    public AuthResponseDTO login(LoginRequestDTO request, HttpServletResponse response){
        Authentication auth = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );
        User userDetails = (User) auth.getPrincipal();
        Usuario usuario = usuarioRepository.findByEmail(userDetails.getUsername())
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado en la base de datos"));
        String rol = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("El usuario no tiene roles asignados"));
        String token = jwtUtils.generarToken(userDetails.getUsername(), rol);
        Cookie cookie = jwtUtils.crearJwtCookie(token);
        response.addCookie(cookie);
        AuthResponseDTO responseDTO = new AuthResponseDTO(
            userDetails.getUsername(),
            rol,
            usuario.getNombres(),
            usuario.getApellidos(),
            usuario.getEstado()
        );
        return responseDTO;
    }

    public void procesarSolicitudRecuperacion(String email){
        Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(email);
        if(usuarioOptional.isPresent()){
            Usuario usuario = usuarioOptional.get();
            verifyCodeRepository.invalidarCodigos(usuario, CodigoEstado.DISPONIBLE, CodigoEstado.EXPIRADO);
            String codigo = String.format("%06d", (int)(Math.random() * 1000000));
            VerifyCode verifyCode = new VerifyCode();
            verifyCode.setCodigo(codigo);
            verifyCode.setUsuario(usuario);
            verifyCode.setEstado(CodigoEstado.DISPONIBLE);
            verifyCode.setFechaExpiracion(LocalDateTime.now().plusMinutes(15));
    
            verifyCodeRepository.save(verifyCode);
            emailService.enviarCodigoVerificacion(usuario.getEmail(), usuario.getNombres(), codigo);
        }
    }

    public VerifyCode verificarCodigo(String email, String codigo){
        Usuario usuario = null;
        Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(email);
        if(usuarioOptional.isPresent()){
            usuario = usuarioOptional.get();
        }
        VerifyCode verifyCode = verifyCodeRepository.findTopByUsuarioAndCodigoAndEstadoOrderByFechaCreacionDesc(usuario, codigo, CodigoEstado.DISPONIBLE)
                .orElseThrow(() -> new RuntimeException("Codigo invalido"));
        

        if(verifyCode.getFechaExpiracion().isBefore(LocalDateTime.now())){
            verifyCode.setEstado(CodigoEstado.EXPIRADO);
            verifyCodeRepository.save(verifyCode);
            throw new RuntimeException("El código ha expirado, solicita uno nuevo");
        }
        return verifyCode;
    }
    public void cambiarPassword(String email, String codigo, String nuevaPassword) {
        Usuario usuario = null;
        Optional<Usuario> usuarioOptional = usuarioRepository.findByEmail(email);
        if(usuarioOptional.isPresent()){
            usuario = usuarioOptional.get();
            usuario.setPassword(passwordEncoder.encode(nuevaPassword));
            usuarioRepository.save(usuario);
            VerifyCode verifyCode = verificarCodigo(email, codigo);
            verifyCode.setEstado(CodigoEstado.USADO);
            verifyCodeRepository.save(verifyCode);
        }
    }
}
