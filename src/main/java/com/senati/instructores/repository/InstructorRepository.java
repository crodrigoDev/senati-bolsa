package com.senati.instructores.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.senati.instructores.model.InstructorModel;

import java.util.*;

@Repository
public interface InstructorRepository extends JpaRepository<InstructorModel, Long> {

    @Query(value = "CALL sp_listar_instructores()", nativeQuery = true)
    List<InstructorModel> listarTodos();

    @Query(value = "CALL sp_buscar_instructor(:id)", nativeQuery = true)
    Optional<InstructorModel> buscarPorId(@Param("id") Long id);
}