//Este arquivo busca e armazena dados do usuário salvos no banco de dados com base no e-mail informado na página de login. Isso será usado pelo Service para checar se os dados informados na página de login estão corretos.

package com.projeto.larconnect.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.projeto.larconnect.model.Reserva;
import com.projeto.larconnect.model.Usuario;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    Optional<Reserva> findById(Long id);

    List<Reserva> findByCondominioId(Long condominioId);
    
}