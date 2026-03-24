package com.projeto.larconnect.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.projeto.larconnect.model.Comunicado;
import com.projeto.larconnect.model.Enquete;

@Repository
public interface EnqueteRepository extends JpaRepository<Enquete, Long> {
    
    List<Enquete> findByCondominioId(Long condominioId);
	
	@Query("SELECT e FROM Enquete e WHERE e.condominio.id = :condominioId AND e.ativo = true")
	List<Enquete> findActiveEnquetesByCondominioId(@Param("condominioId") Long condominioId);
	
	
}
