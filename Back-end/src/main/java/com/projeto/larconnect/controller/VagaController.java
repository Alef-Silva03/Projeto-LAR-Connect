package com.projeto.larconnect.controller;

import com.projeto.larconnect.dto.AnuncioVagaRequestDTO;
import com.projeto.larconnect.dto.ElegibilidadeAnuncioVagaDTO;
import com.projeto.larconnect.dto.VagaRequestDTO;
import com.projeto.larconnect.dto.VagaResponseDTO;
import com.projeto.larconnect.model.StatusVaga;
import com.projeto.larconnect.service.VagaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/vagas")
public class VagaController {
    private final VagaService vagaService;

    public VagaController(VagaService vagaService) {
        this.vagaService = vagaService;
    }

    @GetMapping
    public ResponseEntity<List<VagaResponseDTO>> listarTodas() {
        return ResponseEntity.ok(vagaService.listarTodas());
    }

    @GetMapping("/disponiveis")
    public ResponseEntity<List<VagaResponseDTO>> listarDisponiveis() {
        return ResponseEntity.ok(vagaService.listarDisponiveis());
    }

    @GetMapping("/minha/elegibilidade-anuncio")
    public ResponseEntity<ElegibilidadeAnuncioVagaDTO> consultarElegibilidadeAnuncio() {
        return ResponseEntity.ok(vagaService.consultarElegibilidadeAnuncio());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VagaResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(vagaService.buscarPorId(id));
    }

    @GetMapping("/condominio/{condominioId}")
    public ResponseEntity<List<VagaResponseDTO>> buscarPorCondominio(@PathVariable Long condominioId) {
        return ResponseEntity.ok(vagaService.buscarPorCondominio(condominioId));
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<VagaResponseDTO>> buscarPorPreco(
            @RequestParam BigDecimal min,
            @RequestParam BigDecimal max) {
        return ResponseEntity.ok(vagaService.buscarPorPreco(min, max));
    }

    @PostMapping
    public ResponseEntity<VagaResponseDTO> criarVaga(@Valid @RequestBody VagaRequestDTO request) {
        return new ResponseEntity<>(vagaService.criarVaga(request), HttpStatus.CREATED);
    }

    @PostMapping("/minha/anunciar")
    public ResponseEntity<VagaResponseDTO> anunciarMinhaVaga(@Valid @RequestBody AnuncioVagaRequestDTO request) {
        return new ResponseEntity<>(vagaService.anunciarMinhaVaga(request), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VagaResponseDTO> atualizarVaga(
            @PathVariable Long id,
            @Valid @RequestBody VagaRequestDTO request) {
        return ResponseEntity.ok(vagaService.atualizarVaga(id, request));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> atualizarStatus(
            @PathVariable Long id,
            @RequestParam StatusVaga status) {
        vagaService.atualizarStatus(id, status);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarVaga(@PathVariable Long id) {
        vagaService.deletarVaga(id);
        return ResponseEntity.noContent().build();
    }
}
