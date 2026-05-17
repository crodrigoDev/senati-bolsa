package dashboard.demo.services;

import dashboard.demo.repositories.AprendizRepository;
import dashboard.demo.repositories.CarreraRepository;
import dashboard.demo.repositories.EmpresaRepository;
import dashboard.demo.repositories.UsuarioRepository;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {

    private final EmpresaRepository empresaRepository;
    private final CarreraRepository carreraRepository;
    private final AprendizRepository aprendizRepository;
    private final UsuarioRepository usuarioRepository;

    public DashboardService(
            EmpresaRepository empresaRepository,
            CarreraRepository carreraRepository,
            AprendizRepository aprendizRepository,
            UsuarioRepository usuarioRepository
    ) {
        this.empresaRepository = empresaRepository;
        this.carreraRepository = carreraRepository;
        this.aprendizRepository = aprendizRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public Map<String, Object> obtenerEstadisticas() {

        Map<String, Object> data = new HashMap<>();

        data.put("totalEmpresas", empresaRepository.count());
        data.put("totalCarreras", carreraRepository.count());
        data.put("totalAprendices", aprendizRepository.count());
        data.put("totalUsuarios", usuarioRepository.count());

        Double promedio = aprendizRepository.promedioAvance();
        data.put("promedioAvance", promedio != null ? Math.round(promedio) : 0);

        List<Object[]> estadosCarrera = carreraRepository.contarPorEstado();
        Map<String, Long> progresoCarreras = new LinkedHashMap<>();

        progresoCarreras.put("ACTIVA", 0L);
        progresoCarreras.put("POR_VALIDAR", 0L);
        progresoCarreras.put("INACTIVA", 0L);

        long totalCarrerasContadas = carreraRepository.count();
        for (Object[] fila : estadosCarrera) {
            String estado = (String) fila[0];
            Long cantidad = (Long) fila[1];
            if (estado != null) {
                progresoCarreras.put(estado.toUpperCase(), cantidad);
            }
        }

        Map<String, Object> progresoCarrerasPct = new LinkedHashMap<>();
        progresoCarreras.forEach((estado, cantidad) -> {
            double pct = totalCarrerasContadas > 0
                    ? Math.round((cantidad * 100.0) / totalCarrerasContadas)
                    : 0;
            progresoCarrerasPct.put(estado, pct);
        });
        data.put("progresoCarreras", progresoCarrerasPct);

        List<Object[]> ciclos = aprendizRepository.contarPorCiclo();
        Map<String, Long> aprendicesPorCiclo = new LinkedHashMap<>();
        for (Object[] fila : ciclos) {
            Integer ciclo = (Integer) fila[0];
            Long cantidad = (Long) fila[1];
            if (ciclo != null) {
                aprendicesPorCiclo.put("Ciclo " + ciclo, cantidad);
            }
        }
        data.put("aprendicesPorCiclo", aprendicesPorCiclo);

        List<Object[]> porCarrera = aprendizRepository.contarPorCarrera();
        Map<String, Long> distribucionCarreras = new LinkedHashMap<>();
        for (Object[] fila : porCarrera) {
            String nombreCarrera = (String) fila[0];
            Long cantidad = (Long) fila[1];
            if (nombreCarrera != null) {
                distribucionCarreras.put(nombreCarrera, cantidad);
            }
        }
        data.put("distribucionCarreras", distribucionCarreras);

        return data;
    }
}