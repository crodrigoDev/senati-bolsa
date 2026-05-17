package com.example.senati_bolsa.Models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "empresa_aprendices")
@IdClass(EmpresaAprendizId.class)
@Data
@NoArgsConstructor
public class EmpresaAprendiz {

    @Id
    @Column(name = "id_estudiante")
    private Integer idEstudiante;

    @Id
    @Column(name = "id_empresa")
    private Integer idEmpresa;

    @Column(name = "fecha_convenio", nullable = false)
    private LocalDateTime fechaConvenio;

    @Column(length = 50)
    private String duracion;
}