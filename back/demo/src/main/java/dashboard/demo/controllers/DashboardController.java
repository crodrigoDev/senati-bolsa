package dashboard.demo.controllers;

import org.springframework.web.bind.annotation.*;

import dashboard.demo.services.DashboardService;

import java.util.Map;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin("*")
public class DashboardController {

    private final DashboardService service;

    public DashboardController(DashboardService service) {
        this.service = service;
    }

    @GetMapping("/estadisticas")
    public Map<String, Object> obtenerEstadisticas() {
        return service.obtenerEstadisticas();
    }
}