package com.projeto.larconnect.controller;

import com.projeto.larconnect.dto.FuncionarioResponseDTO;
import com.projeto.larconnect.service.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/funcionarios")
public class PainelDeFuncionariosController {

    @Autowired
    private FuncionarioService funcionarioService;

    @GetMapping("/condominio")
    public ResponseEntity<List<FuncionarioResponseDTO>> getFuncionariosDoCondominio() {
        try {
            List<FuncionarioResponseDTO> funcionarios = funcionarioService.getFuncionariosDoCondominio();
            return ResponseEntity.ok(funcionarios);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}