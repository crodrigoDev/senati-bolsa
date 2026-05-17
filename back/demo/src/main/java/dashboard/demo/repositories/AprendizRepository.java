package dashboard.demo.repositories;

import dashboard.demo.models.Aprendiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AprendizRepository extends JpaRepository<Aprendiz, Long> {


    @Query("SELECT AVG(a.avancePorcentaje) FROM Aprendiz a")
    Double promedioAvance();


    @Query("SELECT a.ciclo, COUNT(a) FROM Aprendiz a GROUP BY a.ciclo ORDER BY a.ciclo")
    List<Object[]> contarPorCiclo();


    @Query("SELECT a.carrera.nombre, COUNT(a) FROM Aprendiz a GROUP BY a.carrera.nombre ORDER BY a.carrera.nombre")
    List<Object[]> contarPorCarrera();
}