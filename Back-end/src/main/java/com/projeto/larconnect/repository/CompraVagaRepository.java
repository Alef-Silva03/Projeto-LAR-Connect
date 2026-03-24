package com.projeto.larconnect.repository;

import com.projeto.larconnect.model.CompraVaga;
import com.projeto.larconnect.model.Usuario;
import com.projeto.larconnect.model.StatusCompra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface CompraVagaRepository extends JpaRepository<CompraVaga, Long> {
    List<CompraVaga> findByCompradorId(Long compradorId);
    List<CompraVaga> findByComprador(Usuario comprador);
    List<CompraVaga> findByStatus(StatusCompra status);
    List<CompraVaga> findByVagaId(Long vagaId);
    
    @Query("SELECT c FROM CompraVaga c WHERE c.comprador.id = :usuarioId AND c.status = :status")
    List<CompraVaga> findByUsuarioIdAndStatus(@Param("usuarioId") Long usuarioId, @Param("status") StatusCompra status);
    
    @Query("SELECT c FROM CompraVaga c WHERE c.dataCompra BETWEEN :inicio AND :fim")
    List<CompraVaga> findByDataCompraBetween(@Param("inicio") LocalDateTime inicio, @Param("fim") LocalDateTime fim);
    
    boolean existsByVagaIdAndStatus(Long vagaId, StatusCompra status);

    Optional<CompraVaga> findFirstByVagaIdAndStatusOrderByDataCompraDesc(Long vagaId, StatusCompra status);
}
