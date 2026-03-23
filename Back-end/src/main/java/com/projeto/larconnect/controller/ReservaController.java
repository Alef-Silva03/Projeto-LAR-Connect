package com.projeto.larconnect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.projeto.larconnect.dto.ReservaResponseDTO;
import com.projeto.larconnect.dto.ReservaRequestDTO;
import com.projeto.larconnect.service.ReservaService;

import jakarta.validation.Valid;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reservas")
@CrossOrigin(origins = "http://localhost:4200")
public class ReservaController {
	
	@Autowired
	private ReservaService reservaService;

    @PostMapping("/create")
    public ResponseEntity<String> create(@Valid @RequestBody ReservaRequestDTO request) {
        try {
        	reservaService.create(request);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Reserva criada com sucesso!");
            return ResponseEntity.status(HttpStatus.CREATED).body("Reserva cadastrada com sucesso!");

        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Reserva já cadastrada para esta data");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao cadastrar: " + e.getMessage());
        }
    }
    
    @GetMapping("/listar")
    public ResponseEntity<List<ReservaResponseDTO>> listar() {
        List<ReservaResponseDTO> chat = reservaService.getReservas();
        return ResponseEntity.ok(chat);
    }
    
    @DeleteMapping("/excluir/{id}")
    public ResponseEntity<Void> excluirReserva(@PathVariable Long id) {
        reservaService.excluirReserva(id);
        return ResponseEntity.noContent().build();
    }
}