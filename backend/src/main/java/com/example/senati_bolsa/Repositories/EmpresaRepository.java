package com.example.senati_bolsa.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.senati_bolsa.Models.Empresa;

import java.util.List;

@Repository
public interface EmpresaRepository extends JpaRepository<Empresa, Integer> {

    @Query(value = "CALL sp_listar_cards_empresas()", nativeQuery = true)
    List<Object[]> listarCardsEmpresas();

    @Query(value = "CALL sp_obtener_contacto_empresa(:p_empresa_id)", nativeQuery = true)
    List<Object[]> obtenerContactoEmpresa(@Param("p_empresa_id") Integer empresaId);

    @Query(value = "CALL sp_obtener_distribucion_aprendices(:p_empresa_id)", nativeQuery = true)
    List<Object[]> obtenerDistribucionAprendices(@Param("p_empresa_id") Integer empresaId);

    @Modifying
    @Query(value = "CALL sp_insertar_empresa(:p_nombre, :p_ruc, :p_gmail, :p_telefono, :p_direccion, :p_estado)", nativeQuery = true)
    void insertarEmpresa(
            @Param("p_nombre") String nombre,
            @Param("p_ruc") String ruc,
            @Param("p_gmail") String gmail,
            @Param("p_telefono") String telefono,
            @Param("p_direccion") String direccion,
            @Param("p_estado") String estado
    );

    @Modifying
    @Query(value = "CALL sp_actualizar_empresa(:p_id, :p_nombre, :p_ruc, :p_gmail, :p_telefono, :p_direccion, :p_estado)", nativeQuery = true)
    void actualizarEmpresa(
            @Param("p_id") Integer id,
            @Param("p_nombre") String nombre,
            @Param("p_ruc") String ruc,
            @Param("p_gmail") String gmail,
            @Param("p_telefono") String telefono,
            @Param("p_direccion") String direccion,
            @Param("p_estado") String estado
    );

    @Modifying
    @Query(value = "CALL sp_eliminar_empresa(:p_id)", nativeQuery = true)
    void eliminarEmpresa(@Param("p_id") Integer id);
}