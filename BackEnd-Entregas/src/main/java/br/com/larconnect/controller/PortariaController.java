package br.com.larconnect.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*; // O '*' importa PatchMapping e PathVariable de uma vez

import br.com.larconnect.dto.EncomendaRequestDTO;
import br.com.larconnect.model.Encomenda;
import br.com.larconnect.repository.EncomendaRepository;
import br.com.larconnect.service.EncomendaService;

@RestController
@RequestMapping("/api/portaria")
@CrossOrigin(origins = "http://localhost:4200")
public class PortariaController {

    @Autowired private EncomendaService service;
    @Autowired private EncomendaRepository repository;

    @GetMapping("/encomendas-pendentes")
    public List<Encomenda> listarPendentes() {
        return repository.findByEntregueFalse();
    }

    @PostMapping("/receber-encomenda")
    public Encomenda salvar(@RequestBody EncomendaRequestDTO dto) {
        return service.registrarRecebimento(dto); 
    }

    @PatchMapping("/entregar/{id}")
    public void marcarComoEntregue(@PathVariable Long id) {
        repository.findById(id).ifPresent(e -> {
            e.setEntregue(true);
            repository.save(e);
        });
    }
}