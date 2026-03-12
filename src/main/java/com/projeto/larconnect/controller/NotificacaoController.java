package com.projeto.larconnect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.projeto.larconnect.model.Notificacao;
import com.projeto.larconnect.repository.NotificacaoRepository;

import java.util.List;

@RestController
@RequestMapping("/api/notificacoes")
@CrossOrigin(origins = "http://localhost:4200")
public class NotificacaoController {

    @Autowired
    private NotificacaoRepository repository;

    @GetMapping("/usuario/{id}")
    public List<Notificacao> listarMinhasNotificacoes(@PathVariable Long id) {
        return repository.findByDestinatarioIdAndLidaFalse(id);
    }

    @PatchMapping("/{id}/marcar-lida")
    public void marcarComoLida(@PathVariable Long id) {
        repository.findById(id).ifPresent(n -> {
            n.setLida(true);
            repository.save(n);
        });
    }
}