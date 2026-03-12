package br.com.larconnect.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.larconnect.model.Notificacao;
import java.util.List;

public interface NotificacaoRepository extends JpaRepository<Notificacao, Long> {
    // Busca apenas notificações não lidas de um morador específico
    List<Notificacao> findByDestinatarioIdAndLidaFalse(Long usuarioId);
}