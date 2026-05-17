package dashboard.demo.controllers;

import dashboard.demo.models.VerifyCode;
import dashboard.demo.services.VerifyCodeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/verify-codes")
@CrossOrigin("*")
public class VerifyCodeController {

    private final VerifyCodeService service;

    public VerifyCodeController(VerifyCodeService service) {
        this.service = service;
    }

    @GetMapping
    public List<VerifyCode> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Optional<VerifyCode> obtenerPorId(@PathVariable Long id) {
        return service.obtenerPorId(id);
    }

    @PostMapping
    public VerifyCode guardar(@RequestBody VerifyCode code) {
        return service.guardar(code);
    }

    @PutMapping("/{id}")
    public VerifyCode actualizar(
            @PathVariable Long id,
            @RequestBody VerifyCode code
    ) {
        return service.actualizar(id, code);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }
}