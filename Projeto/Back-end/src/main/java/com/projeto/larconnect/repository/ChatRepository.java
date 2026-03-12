package com.projeto.larconnect.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.projeto.larconnect.model.Chat;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    
    // Buscar comunicados por ID do condomínio em ordem decrescente
    List<Chat> findByCondominioIdOrderByIdDesc(Long condominioId);
    
    void deleteById(Long Id);
}
