package com.projeto.larconnect.repository;

import org.springframework.stereotype.Repository;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.projeto.larconnect.model.Condominio;

@Repository
public interface CondominioRepository extends JpaRepository<Condominio, Long> {
	
    // Método para buscar condominio por nome
    Condominio findByNomeCondominio(String nomeCondominio);
}
