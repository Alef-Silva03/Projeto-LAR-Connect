package com.projeto.larconnect.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.larconnect.dto.ComunicadoResponseDTO;
import com.projeto.larconnect.service.ComunicadoService;

@RestController
public class CarregarComunicadosController {
    @Autowired
    private ComunicadoService comunicadoService;
    
    @GetMapping("/painel_comunicados/listar")
    public ResponseEntity<List<ComunicadoResponseDTO>> getComunicadosDoCondominio() {
        try {
            List<ComunicadoResponseDTO> comunicados = comunicadoService.getComunicadosDoCondominio();
            return ResponseEntity.ok(comunicados);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
