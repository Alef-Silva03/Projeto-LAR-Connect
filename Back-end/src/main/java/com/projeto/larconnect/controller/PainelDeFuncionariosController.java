package com.projeto.larconnect.controller;

import com.projeto.larconnect.dto.FuncionarioResponseDTO;
import com.projeto.larconnect.dto.UsuarioResponseDTO;
import com.projeto.larconnect.dto.UsuarioUpdateDTO;
import com.projeto.larconnect.model.Usuario;
import com.projeto.larconnect.service.FuncionarioService;
import com.projeto.larconnect.service.UsuarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/funcionarios")
public class PainelDeFuncionariosController {

    @Autowired
    private FuncionarioService funcionarioService;
	
    @Autowired
    private UsuarioService usuarioService;
    
    @GetMapping("/condominio")
    public ResponseEntity<List<FuncionarioResponseDTO>> getFuncionariosDoCondominio() {
        try {
            List<FuncionarioResponseDTO> funcionarios = funcionarioService.getFuncionariosDoCondominio();
            return ResponseEntity.ok(funcionarios);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PatchMapping("/remover/{email}")
    public ResponseEntity<UsuarioResponseDTO> updateUsuario(@PathVariable String email, 
                                                            @RequestBody UsuarioUpdateDTO usuarioUpdateDto) {
        try {
            Usuario usuarioAtualizado = usuarioService.update(email, usuarioUpdateDto);
            UsuarioResponseDTO usuarioResponseDto = new UsuarioResponseDTO(usuarioAtualizado);
            return ResponseEntity.ok(usuarioResponseDto);
        } catch (Exception e) {
            System.out.println("ERRO NA ATUALIZAÇÃO: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
}