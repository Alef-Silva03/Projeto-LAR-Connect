package com.projeto.larconnect.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.projeto.larconnect.model.StatusVaga;
import com.projeto.larconnect.model.Vaga;
import java.math.BigDecimal;
import java.util.List;

@Repository
public interface VagaRepository extends JpaRepository<Vaga, Long> {
    List<Vaga> findByStatus(StatusVaga status);
    List<Vaga> findByCondominioId(Long condominioId);
    List<Vaga> findByCondominioIdAndStatus(Long condominioId, StatusVaga status);
    boolean existsByNumero(String numero);
    
    @Query("SELECT v FROM Vaga v WHERE v.preco BETWEEN :min AND :max")
    List<Vaga> findByPrecoBetween(@Param("min") BigDecimal min, @Param("max") BigDecimal max);
    
    @Query("SELECT v FROM Vaga v WHERE v.bloco = :bloco")
    List<Vaga> findByBloco(@Param("bloco") String bloco);
}