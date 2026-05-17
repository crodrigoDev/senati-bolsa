package com.senati.instructores.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.senati.instructores.model.InstructorModel;
import com.senati.instructores.repository.InstructorRepository;

import java.util.List;
import java.util.Optional;

@Service
public class InstructorService {

    @Autowired
    private InstructorRepository repository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<InstructorModel> listarTodos() {
        return repository.listarTodos();
    }

    public Optional<InstructorModel> buscarPorId(Long id) {
        return repository.buscarPorId(id);
    }

    public void guardar(InstructorModel i) {
       
        jdbcTemplate.update("CALL sp_crear_instructor(?, ?, ?, ?, ?, ?, ?)",
            i.getNombres(),
            i.getApellidoPaterno(),
            i.getApellidoMaterno(),
            i.getCorreoInstitucional(),
            i.getCorreoPersonal(),
            i.getTelefono(),
            i.getDni()
        );
    }
}