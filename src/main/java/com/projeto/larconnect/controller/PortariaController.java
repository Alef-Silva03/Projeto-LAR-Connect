package com.projeto.larconnect.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.projeto.larconnect.model.Encomenda;
import com.projeto.larconnect.repository.EncomendaRepository;


@RestController
@RequestMapping("/api/portaria")
@CrossOrigin(origins = "http://localhost:4200")
public class PortariaController {

    @Autowired 
    private EncomendaRepository repository;

    @GetMapping("/encomendas-pendentes")
    public List<Encomenda> listarPendentes() {
        return repository.findByEntregueFalse();
    }

    // NOVO: Endpoint para o histórico de entregas realizadas
    @GetMapping("/historico")
    public List<Encomenda> listarHistorico() {
        return repository.findByEntregueTrue();
    }

    @PatchMapping("/entregar/{id}")
    public void marcarComoEntregue(@PathVariable Long id) {
        repository.findById(id).ifPresent(e -> {
            e.setEntregue(true);
            e.setDataEntrega(java.time.LocalDateTime.now());
            repository.save(e);
        });
    }
}