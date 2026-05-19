package com.example.senati_bolsa.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.senati_bolsa.Models.InstructorModel;
import com.example.senati_bolsa.Services.InstructorService;

import java.util.List;

@RestController
@RequestMapping("/api/instructores")
@CrossOrigin(origins = "*")
public class InstructorController {

    @Autowired
    private InstructorService service;

    @GetMapping
    public List<InstructorModel> listar() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<InstructorModel> buscar(@PathVariable Long id) {
        return service.buscarPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<String> crear(@RequestBody InstructorModel instructor) {
        service.guardar(instructor);
        return ResponseEntity.ok("Instructor creado correctamente");
    }
}