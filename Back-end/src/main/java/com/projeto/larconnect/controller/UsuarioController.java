package com.projeto.larconnect.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.larconnect.dto.UsuarioResponseDTO;
import com.projeto.larconnect.dto.UsuarioUpdateDTO;
import com.projeto.larconnect.model.Usuario;
import com.projeto.larconnect.service.UsuarioService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PatchMapping("/{email}")
    public ResponseEntity<?> updateUsuario(@PathVariable String email,
                                           @RequestBody UsuarioUpdateDTO usuarioUpdateDto) {
        try {
            Usuario usuarioAtualizado = usuarioService.update(email, usuarioUpdateDto);
            UsuarioResponseDTO usuarioResponseDto = new UsuarioResponseDTO(usuarioAtualizado);
            return ResponseEntity.ok(usuarioResponseDto);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message",
                            "Usuario nao encontrado. O morador precisa se cadastrar antes de ser vinculado ao condominio."));
        } catch (Exception e) {
            System.out.println("ERRO NA ATUALIZACAO: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Nao foi possivel atualizar o usuario agora."));
        }
    }
}
