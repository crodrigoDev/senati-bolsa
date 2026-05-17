package com.example.senati_bolsa.Models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "empresas")
@Data
@NoArgsConstructor
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nombre_comercial", nullable = false, length = 150)
    private String nombreComercial;

    @Column(nullable = false, length = 11)
    private String ruc;

    @Column(name = "gmail_contacto", nullable = false, length = 100)
    private String gmailContacto;

    @Column(length = 15)
    private String telefono;

    @Column(length = 255)
    private String direccion;

    // Modificación clave: Le indicamos a Hibernate que en la base de datos es un ENUM
    @Column(columnDefinition = "ENUM('activa', 'por validar', 'inactiva', 'suspendida')")
    private String estado = "por validar";

    @Column(name = "fecha_registro", updatable = false, insertable = false)
    private LocalDateTime fechaRegistro;

    @Column(name = "fecha_actualizacion", insertable = false, updatable = false)
    private LocalDateTime fechaActualizacion;
}