package com.projeto.larconnect.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.projeto.larconnect.model.Comunicado;

@Repository
public interface ComunicadoRepository extends JpaRepository<Comunicado, Long> {
    
    // Buscar comunicados por ID do condomínio em ordem decrescente
    List<Comunicado> findByCondominioIdOrderByIdDesc(Long condominioId);
    
    void deleteById(Long Id);
}
