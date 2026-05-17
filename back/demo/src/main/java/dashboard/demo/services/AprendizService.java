package dashboard.demo.services;

import dashboard.demo.models.Aprendiz;
import dashboard.demo.repositories.AprendizRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AprendizService {

    private final AprendizRepository repository;

    public AprendizService(AprendizRepository repository) {
        this.repository = repository;
    }

    public List<Aprendiz> listar() {
        return repository.findAll();
    }

    public Optional<Aprendiz> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public Aprendiz guardar(Aprendiz aprendiz) {
        return repository.save(aprendiz);
    }

    public Aprendiz actualizar(Long id, Aprendiz aprendizActualizado) {
        return repository.findById(id).map(aprendiz -> {
            aprendiz.setUsuario(aprendizActualizado.getUsuario());
            aprendiz.setCarrera(aprendizActualizado.getCarrera());
            aprendiz.setCiclo(aprendizActualizado.getCiclo());
            aprendiz.setAvancePorcentaje(aprendizActualizado.getAvancePorcentaje());
            aprendiz.setFechaIngreso(aprendizActualizado.getFechaIngreso());
            return repository.save(aprendiz);
        }).orElseThrow(() -> new RuntimeException("Aprendiz no encontrado"));
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }

    public long totalAprendices() {
        return repository.count();
    }

    public Double promedioAvance() {
        return repository.promedioAvance();
    }
}