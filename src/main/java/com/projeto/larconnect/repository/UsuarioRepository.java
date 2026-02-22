//Este arquivo busca e armazena dados do usuário salvos no banco de dados com base no e-mail informado na página de login. Isso será usado pelo Service para checar se os dados informados na página de login estão corretos.

package com.projeto.larconnect.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.projeto.larconnect.model.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmailIgnoreCase(String email);
    Optional<Usuario> findByResetToken(String resetToken);
    boolean existsByEmailIgnoreCase(String email);
    
    // Novo método para buscar moradores por ID do condomínio
    List<Usuario> findByCondominioId(Long condominioId);
    
    // Ou com JPQL para mais controle
    @Query("SELECT u FROM Usuario u WHERE u.condominio.id = :condominioId")
    List<Usuario> findMoradoresByCondominioId(@Param("condominioId") Long condominioId);
}