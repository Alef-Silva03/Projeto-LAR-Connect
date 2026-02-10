package com.projeto.larconnect.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.projeto.larconnect.model.Morador;

@Repository
public interface MoradorRepository extends JpaRepository<Morador, Long> {
	Optional<Morador> findByEmailIgnoreCase(String email);
}

