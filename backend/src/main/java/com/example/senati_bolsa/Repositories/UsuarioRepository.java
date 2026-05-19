package com.example.senati_bolsa.repository;

import com.example.senati_bolsa.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    @Query(value = "CALL SP_ObtenerPerfilPorId(:id)", nativeQuery = true)
    List<Map<String, Object>> obtenerPerfilPorId(@Param("id") Integer id);

    @Modifying
    @Transactional
    @Query(value = "CALL SP_ActualizarPerfil(:id, :nombres, :apellidos, :numero, :fotoUrl)", nativeQuery = true)
    void actualizarPerfil(@Param("id") Integer id, @Param("nombres") String nombres,
                          @Param("apellidos") String apellidos, @Param("numero") String numero,
                          @Param("fotoUrl") String fotoUrl);

    @Modifying
    @Transactional
    @Query(value = "CALL SP_ActualizarPassword(:id, :password)", nativeQuery = true)
    void actualizarPassword(@Param("id") Integer id, @Param("password") String password);
}
