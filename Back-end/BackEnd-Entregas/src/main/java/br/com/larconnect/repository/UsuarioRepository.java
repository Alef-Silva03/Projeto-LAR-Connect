package br.com.larconnect.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.larconnect.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    // Este é o método que o erro reclamou que estava faltando:
    Optional<Usuario> findByLogin(String login);

    // Este é o método que usamos para a busca do morador no registro de encomendas:
    Optional<Usuario> findByApartamentoAndBloco(String apartamento, String bloco);
}