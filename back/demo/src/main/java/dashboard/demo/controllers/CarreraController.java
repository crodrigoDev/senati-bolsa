package dashboard.demo.controllers;

import org.springframework.web.bind.annotation.*;

import dashboard.demo.models.Carrera;
import dashboard.demo.services.CarreraService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/carreras")
@CrossOrigin("*")
public class CarreraController {

    private final CarreraService service;

    public CarreraController(CarreraService service) {
        this.service = service;
    }

    @GetMapping
    public List<Carrera> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Optional<Carrera> obtenerPorId(@PathVariable Long id) {
        return service.obtenerPorId(id);
    }

    @PostMapping
    public Carrera guardar(@RequestBody Carrera carrera) {
        return service.guardar(carrera);
    }

    @PutMapping("/{id}")
    public Carrera actualizar(
            @PathVariable Long id,
            @RequestBody Carrera carrera
    ) {
        return service.actualizar(id, carrera);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}