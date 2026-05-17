package dashboard.demo.services;

import dashboard.demo.models.Empresa;
import dashboard.demo.repositories.EmpresaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmpresaService {

    private final EmpresaRepository repository;

    public EmpresaService(EmpresaRepository repository) {
        this.repository = repository;
    }

    public List<Empresa> listar() {
        return repository.findAll();
    }

    public Optional<Empresa> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public Empresa guardar(Empresa empresa) {
        return repository.save(empresa);
    }

    public Empresa actualizar(Long id, Empresa empresaActualizada) {
        return repository.findById(id).map(empresa -> {
            empresa.setRazonSocial(empresaActualizada.getRazonSocial());
            empresa.setNombreComercial(empresaActualizada.getNombreComercial());
            empresa.setRuc(empresaActualizada.getRuc());
            empresa.setDireccion(empresaActualizada.getDireccion());
            empresa.setTelefono(empresaActualizada.getTelefono());
            empresa.setEmailContacto(empresaActualizada.getEmailContacto());
            empresa.setEstado(empresaActualizada.getEstado());
            empresa.setFechaRegistro(empresaActualizada.getFechaRegistro());
            return repository.save(empresa);
        }).orElseThrow(() -> new RuntimeException("Empresa no encontrada"));
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }

    public long totalEmpresas() {
        return repository.count();
    }
}