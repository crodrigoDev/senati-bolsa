package com.example.senati_bolsa.Models;

import jakarta.persistence.*;


import lombok.Data;
import lombok.NoArgsConstructor;

    
@Entity
@Table(name = "instructores")
@Data
@NoArgsConstructor
public class InstructorModel  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombres;

    @Column(name = "apellido_paterno")
    private String apellidoPaterno;

    @Column(name = "apellido_materno")
    private String apellidoMaterno;

    @Column(name = "correo_institucional")
    private String correoInstitucional;

    @Column(name = "correo_personal")
    private String correoPersonal;

    private String telefono;
    private String dni;
}