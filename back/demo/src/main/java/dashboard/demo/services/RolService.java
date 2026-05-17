package dashboard.demo.services;

import dashboard.demo.models.Rol;
import dashboard.demo.repositories.RolRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RolService {

    private final RolRepository repository;

    public RolService(RolRepository repository) {
        this.repository = repository;
    }

    public List<Rol> listar() {
        return repository.findAll();
    }

    public Optional<Rol> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public Rol guardar(Rol rol) {
        return repository.save(rol);
    }

    public Rol actualizar(Long id, Rol rolActualizado) {
        return repository.findById(id).map(rol -> {
            rol.setNombre(rolActualizado.getNombre());
            return repository.save(rol);
        }).orElseThrow(() -> new RuntimeException("Rol no encontrado"));
    }

    public long totalRoles() {
        return repository.count();
    }
}