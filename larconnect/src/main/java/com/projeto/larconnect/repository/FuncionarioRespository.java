package com.projeto.larconnect.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.larconnect.model.Funcionario;
import com.projeto.larconnect.model.Morador;

@Repository
public interface FuncionarioRespository extends JpaRepository<Funcionario, Long> {
	Optional<Funcionario> findByEmailIgnoreCase(String email);
}

