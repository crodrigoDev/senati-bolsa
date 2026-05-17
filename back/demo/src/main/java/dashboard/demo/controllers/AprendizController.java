package dashboard.demo.controllers;

import dashboard.demo.models.Aprendiz;
import dashboard.demo.services.AprendizService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/aprendices")
@CrossOrigin("*")
public class AprendizController {

    private final AprendizService service;

    public AprendizController(AprendizService service) {
        this.service = service;
    }

    @GetMapping
    public List<Aprendiz> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Optional<Aprendiz> obtenerPorId(@PathVariable Long id) {
        return service.obtenerPorId(id);
    }

    @PostMapping
    public Aprendiz guardar(@RequestBody Aprendiz aprendiz) {
        return service.guardar(aprendiz);
    }

    @PutMapping("/{id}")
    public Aprendiz actualizar(
            @PathVariable Long id,
            @RequestBody Aprendiz aprendiz
    ) {
        return service.actualizar(id, aprendiz);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}