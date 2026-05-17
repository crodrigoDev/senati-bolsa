package dashboard.demo.services;

import org.springframework.stereotype.Service;

import dashboard.demo.models.Carrera;
import dashboard.demo.repositories.CarreraRepository;

import java.util.List;
import java.util.Optional;

@Service
public class CarreraService {

    private final CarreraRepository repository;

    public CarreraService(CarreraRepository repository) {
        this.repository = repository;
    }

    public List<Carrera> listar() {
        return repository.findAll();
    }

    public Optional<Carrera> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public Carrera guardar(Carrera carrera) {
        return repository.save(carrera);
    }

    public Carrera actualizar(Long id, Carrera carreraActualizada) {
        return repository.findById(id).map(carrera -> {
            carrera.setNombre(carreraActualizada.getNombre());
            carrera.setEstado(carreraActualizada.getEstado());
            carrera.setFechaCreacion(carreraActualizada.getFechaCreacion());
            return repository.save(carrera);
        }).orElseThrow(() -> new RuntimeException("Carrera no encontrada"));
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }

    public long totalCarreras() {
        return repository.count();
    }
}