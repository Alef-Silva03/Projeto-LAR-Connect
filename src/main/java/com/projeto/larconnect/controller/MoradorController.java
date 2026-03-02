package com.projeto.larconnect.controller;

import com.projeto.larconnect.dto.MoradorResponseDTO;
import com.projeto.larconnect.service.MoradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/moradores")
public class MoradorController {

    @Autowired
    private MoradorService moradorService;

    @GetMapping("/condominio")
    public ResponseEntity<List<MoradorResponseDTO>> getMoradoresDoCondominio() {
        try {
            List<MoradorResponseDTO> moradores = moradorService.getMoradoresDoCondominio();
            return ResponseEntity.ok(moradores);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}