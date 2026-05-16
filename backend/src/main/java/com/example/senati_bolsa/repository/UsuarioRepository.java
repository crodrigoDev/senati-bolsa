package com.example.senati_bolsa.repository;

import com.example.senati_bolsa.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    Optional<Usuario> findByEmail(String email);

    @Procedure(procedureName = "SP_ActualizarPerfil")
    void actualizarPerfil(
            @Param("p_id") Integer id,
            @Param("p_nombres") String nombres,
            @Param("p_apellidos") String apellidos,
            @Param("p_numero") String numero,
            @Param("p_foto_url") String fotoUrl);

    @Procedure(procedureName = "SP_ActualizarPassword")
    void actualizarPassword(
            @Param("p_id") Integer id,
            @Param("p_password") String password);
}
