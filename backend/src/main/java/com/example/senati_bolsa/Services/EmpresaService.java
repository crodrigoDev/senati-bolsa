package com.example.senati_bolsa.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.senati_bolsa.Repositories.EmpresaRepository;

import java.util.*;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository empresaRepository;

    @Transactional(readOnly = true)
    public List<Map<String, Object>> listarCards() {
        List<Object[]> rawData = empresaRepository.listarCardsEmpresas();
        List<Map<String, Object>> response = new ArrayList<>();

        for (Object[] row : rawData) {
            Map<String, Object> map = new LinkedHashMap<>();
            // Aseguramos tipos de datos para que Spring Boot no falle al serializar a JSON
            map.put("empresa_id", row[0] != null ? ((Number) row[0]).longValue() : 0L);
            map.put("empresa_nombre", row[1] != null ? row[1].toString() : "");
            map.put("empresa_ruc", row[2] != null ? row[2].toString() : "");
            map.put("empresa_telefono", row[3] != null ? row[3].toString() : "");
            map.put("empresa_estado", row[4] != null ? row[4].toString() : "");
            map.put("monitor_nombre", row[5] != null ? row[5].toString() : "Ningún monitor asignado");
            map.put("total_aprendices", row[6] != null ? ((Number) row[6]).intValue() : 0);
            response.add(map);
        }
        return response;
    }

    @Transactional(readOnly = true)
    public Map<String, Object> obtenerContacto(Integer id) {
        List<Object[]> rawData = empresaRepository.obtenerContactoEmpresa(id);
        if (rawData.isEmpty()) return null;

        Object[] row = rawData.get(0);
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("empresa_id", row[0] != null ? ((Number) row[0]).longValue() : 0L);
        map.put("empresa_nombre", row[1] != null ? row[1].toString() : "");
        map.put("empresa_ruc", row[2] != null ? row[2].toString() : "");
        map.put("empresa_estado", row[3] != null ? row[3].toString() : "");
        map.put("empresa_telefono", row[4] != null ? row[4].toString() : "");
        map.put("empresa_correo", row[5] != null ? row[5].toString() : "");
        map.put("empresa_direccion", row[6] != null ? row[6].toString() : "");
        map.put("monitor_asignado", row[7] != null ? row[7].toString() : "Ninguno");
        return map;
    }

    @Transactional(readOnly = true)
    public List<Map<String, Object>> obtenerDistribucion(Integer id) {
        List<Object[]> rawData = empresaRepository.obtenerDistribucionAprendices(id);
        List<Map<String, Object>> response = new ArrayList<>();

        for (Object[] row : rawData) {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("carrera_nombre", row[0] != null ? row[0].toString() : "");
            map.put("cantidad", row[1] != null ? ((Number) row[1]).intValue() : 0);
            map.put("porcentaje", row[2] != null ? ((Number) row[2]).doubleValue() : 0.0);
            response.add(map);
        }
        return response;
    }

    @Transactional
    public Integer guardar(Map<String, String> datos) {
        empresaRepository.insertarEmpresa(
                datos.get("nombreComercial"),
                datos.get("ruc"),
                datos.get("gmailContacto"),
                datos.get("telefono"),
                datos.get("direccion"),
                datos.get("estado")
        );
        return 1;
    }

    @Transactional
    public void actualizar(Integer id, Map<String, String> datos) {
        empresaRepository.actualizarEmpresa(
                id,
                datos.get("nombreComercial"),
                datos.get("ruc"),
                datos.get("gmailContacto"),
                datos.get("telefono"),
                datos.get("direccion"),
                datos.get("estado")
        );
    }

    @Transactional
    public void eliminar(Integer id) {
        empresaRepository.eliminarEmpresa(id);
    }
}