package com.example.senati_bolsa.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.senati_bolsa.Enums.CodigoEstado;
import com.example.senati_bolsa.Models.Usuario;
import com.example.senati_bolsa.Models.VerifyCode;

import jakarta.transaction.Transactional;

@Repository
public interface VerifyCodeRepository extends JpaRepository<VerifyCode, Integer> {
    Optional<VerifyCode> findTopByUsuarioAndCodigoAndEstadoOrderByFechaCreacionDesc(Usuario usuario, String codigo, CodigoEstado estado);
    @Modifying
    @Transactional
    @Query("UPDATE VerifyCode vc set vc.estado = :nuevoEstado where vc.usuario = :usuario and vc.estado = :estadoActual")
    void invalidarCodigos(Usuario usuario, CodigoEstado estadoActual, CodigoEstado nuevoEstado);
    
}
