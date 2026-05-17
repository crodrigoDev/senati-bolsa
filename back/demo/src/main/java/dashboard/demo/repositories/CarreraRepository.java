package dashboard.demo.repositories;

import dashboard.demo.models.Carrera;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarreraRepository extends JpaRepository<Carrera, Long> {

    @Query("SELECT c.estado, COUNT(c) FROM Carrera c GROUP BY c.estado")
    List<Object[]> contarPorEstado();
}