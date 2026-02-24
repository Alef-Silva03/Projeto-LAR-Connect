package br.com.larconnect.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.larconnect.model.Encomenda;
import br.com.larconnect.repository.EncomendaRepository;

@RestController
@RequestMapping("/api/encomendas")
@CrossOrigin(origins = "http://localhost:4200")
public class EncomendaController {

    @Autowired
    private EncomendaRepository repository;
    
    @Autowired
    private EncomendaService encomendaService;

    @GetMapping
    public List<Encomenda> listar() {
        // Retorna apenas encomendas que ainda não foram entregues
        List<Encomenda> encomenda = encomendaService.getEncomendasDoCondominio();
        return ResponseEntity.ok(encomenda);
    }

    @PostMapping
    public Encomenda salvar(@RequestBody Encomenda encomenda) {
        return repository.save(encomenda);
    }

    @PatchMapping("/{id}/entregar")
    public void entregar(@PathVariable Long id) {
        repository.findById(id).ifPresent(e -> {
            e.setEntregue(true);
            repository.save(e);
        });
    }
}