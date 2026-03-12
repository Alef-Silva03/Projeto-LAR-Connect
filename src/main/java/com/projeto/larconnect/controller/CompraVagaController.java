package com.projeto.larconnect.controller;

import com.projeto.larconnect.dto.CompraVagaRequestDTO;
import com.projeto.larconnect.dto.PagamentoRequestDTO;
import com.projeto.larconnect.dto.CompraVagaResponseDTO;
import com.projeto.larconnect.dto.PagamentoResponseDTO;
import com.projeto.larconnect.service.CompraVagaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/compras-vagas")
public class CompraVagaController {
    private final CompraVagaService compraService;
    
    public CompraVagaController(CompraVagaService compraService) {
		this.compraService = compraService;
	}

    @GetMapping
    public ResponseEntity<List<CompraVagaResponseDTO>> listarTodas() {
        return ResponseEntity.ok(compraService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompraVagaResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(compraService.buscarPorId(id));
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<CompraVagaResponseDTO>> buscarPorUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(compraService.buscarPorUsuario(usuarioId));
    }

    @PostMapping("/iniciar")
    public ResponseEntity<CompraVagaResponseDTO> iniciarCompra(@Valid @RequestBody CompraVagaRequestDTO request) {
        return new ResponseEntity<>(compraService.iniciarCompra(request), HttpStatus.CREATED);
    }

    @PostMapping("/pagamento")
    public ResponseEntity<PagamentoResponseDTO> processarPagamento(@Valid @RequestBody PagamentoRequestDTO request) {
        return new ResponseEntity<>(compraService.processarPagamento(request), HttpStatus.CREATED);
    }

    @PostMapping("/{compraId}/confirmar-pagamento")
    public ResponseEntity<CompraVagaResponseDTO> confirmarPagamento(
            @PathVariable Long compraId,
            @RequestParam String transacaoId) {
        return ResponseEntity.ok(compraService.confirmarPagamento(compraId, transacaoId));
    }

    @PostMapping("/{compraId}/cancelar")
    public ResponseEntity<CompraVagaResponseDTO> cancelarCompra(@PathVariable Long compraId) {
        return ResponseEntity.ok(compraService.cancelarCompra(compraId));
    }
}