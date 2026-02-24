package br.com.larconnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.larconnect.model.Encomenda;

@Repository
public interface EncomendaRepository extends JpaRepository<Encomenda, Long> {
    
    // O Spring gera a lógica automaticamente baseada no nome do método!
    List<Encomenda> findByEntregueFalse();
}