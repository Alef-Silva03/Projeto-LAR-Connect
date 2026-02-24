package br.com.larconnect.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.larconnect.model.Notificacao;

public interface NotificacaoRepository extends JpaRepository<Notificacao, Long> {
}