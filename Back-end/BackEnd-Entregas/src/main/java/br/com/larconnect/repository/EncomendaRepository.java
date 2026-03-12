package br.com.larconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.larconnect.model.Encomenda;

@Repository
public interface EncomendaRepository extends JpaRepository<Encomenda, Long> {
    // Para a aba "Entregas Ativas"
    List<Encomenda> findByEntregueFalse();

    // NOVO: Para a aba "Histórico"
    List<Encomenda> findByEntregueTrue();
}