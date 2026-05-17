package dashboard.demo.controllers;

import dashboard.demo.models.Empresa;
import dashboard.demo.services.EmpresaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/empresas")
@CrossOrigin("*")
public class EmpresaController {

    private final EmpresaService service;

    public EmpresaController(EmpresaService service) {
        this.service = service;
    }

    @GetMapping
    public List<Empresa> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Optional<Empresa> obtenerPorId(@PathVariable Long id) {
        return service.obtenerPorId(id);
    }

    @PostMapping
    public Empresa guardar(@RequestBody Empresa empresa) {
        return service.guardar(empresa);
    }

    @PutMapping("/{id}")
    public Empresa actualizar(
            @PathVariable Long id,
            @RequestBody Empresa empresa
    ) {
        return service.actualizar(id, empresa);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}