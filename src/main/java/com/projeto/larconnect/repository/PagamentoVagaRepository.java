package com.projeto.larconnect.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.projeto.larconnect.model.PagamentoVaga;
import com.projeto.larconnect.model.StatusPagamento;
import java.util.List;
import java.util.Optional;

@Repository
public interface PagamentoVagaRepository extends JpaRepository<PagamentoVaga, Long> {
    Optional<PagamentoVaga> findByCompraId(Long compraId);
    Optional<PagamentoVaga> findByTransacaoId(String transacaoId);
    List<PagamentoVaga> findByStatusPagamento(StatusPagamento statusPagamento);
    List<PagamentoVaga> findByMetodoPagamento(String metodoPagamento);
}