package com.example.senati_bolsa.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.senati_bolsa.Services.EmpresaService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/empresas")
@CrossOrigin(origins = "*")
public class EmpresaController {

    @Autowired
    private EmpresaService empresaService;

    @GetMapping("/cards")
    public ResponseEntity<List<Map<String, Object>>> getCards() {
        return ResponseEntity.ok(empresaService.listarCards());
    }

    @GetMapping("/{id}/contacto")
    public ResponseEntity<Map<String, Object>> getContacto(@PathVariable Integer id) {
        Map<String, Object> contacto = empresaService.obtenerContacto(id);
        if (contacto == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(contacto);
    }

    @GetMapping("/{id}/distribucion")
    public ResponseEntity<List<Map<String, Object>>> getDistribucion(@PathVariable Integer id) {
        return ResponseEntity.ok(empresaService.obtenerDistribucion(id));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> crear(@RequestBody Map<String, String> body) {
        Integer nuevoId = empresaService.guardar(body);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("id", nuevoId, "mensaje", "Empresa registrada con éxito"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, String>> actualizar(@PathVariable Integer id, @RequestBody Map<String, String> body) {
        empresaService.actualizar(id, body);
        return ResponseEntity.ok(Map.of("mensaje", "Empresa actualizada correctamente"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> eliminar(@PathVariable Integer id) {
        empresaService.eliminar(id);
        return ResponseEntity.ok(Map.of("mensaje", "Empresa eliminada del sistema"));
    }
}