package com.example.senati_bolsa.Models;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmpresaAprendizId implements Serializable {
    private Integer idEstudiante;
    private Integer idEmpresa;
}