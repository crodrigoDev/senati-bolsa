package com.example.senati_bolsa.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.senati_bolsa.Enums.CodigoEstado;
import com.example.senati_bolsa.Models.Usuario;
import com.example.senati_bolsa.Models.VerifyCode;

@Repository
public interface VerifyCodeRepository extends JpaRepository<VerifyCode, Integer> {
    Optional<VerifyCode> findTopByUsuarioAndCodigoAndEstadoOrderByFechaCreacionDesc(Usuario usuario, String codigo, CodigoEstado estado);
    
}
