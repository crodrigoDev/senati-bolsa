package dashboard.demo.services;

import org.springframework.stereotype.Service;

import dashboard.demo.models.VerifyCode;
import dashboard.demo.repositories.VerifyCodeRepository;

import java.util.List;
import java.util.Optional;

@Service
public class VerifyCodeService {

    private final VerifyCodeRepository repository;

    public VerifyCodeService(VerifyCodeRepository repository) {
        this.repository = repository;
    }

    public List<VerifyCode> listar() {
        return repository.findAll();
    }

    public Optional<VerifyCode> obtenerPorId(Long id) {
        return repository.findById(id);
    }

    public VerifyCode guardar(VerifyCode code) {
        return repository.save(code);
    }

    public VerifyCode actualizar(Long id, VerifyCode codeActualizado) {
        return repository.findById(id).map(code -> {
            code.setCodigo(codeActualizado.getCodigo());
            code.setEmailUsuario(codeActualizado.getEmailUsuario());
            code.setFechaExpiracion(codeActualizado.getFechaExpiracion());
            code.setUsado(codeActualizado.getUsado());
            code.setFechaCreacion(codeActualizado.getFechaCreacion());
            return repository.save(code);
        }).orElseThrow(() -> new RuntimeException("Codigo no encontrado"));
    }

    public void eliminar(Long id) {
        repository.deleteById(id);
    }

    public long totalCodigos() {
        return repository.count();
    }
}