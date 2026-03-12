package com.projeto.larconnect.controller;

import com.projeto.larconnect.dto.MoradorResponseDTO;
import com.projeto.larconnect.dto.UsuarioResponseDTO;
import com.projeto.larconnect.dto.UsuarioUpdateDTO;
import com.projeto.larconnect.model.Usuario;
import com.projeto.larconnect.service.MoradorService;
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
@RequestMapping("/api/moradores")
public class MoradorController {

    @Autowired
    private MoradorService moradorService;
	
    @Autowired
    private UsuarioService usuarioService;
    
    @GetMapping("/condominio")
    public ResponseEntity<List<MoradorResponseDTO>> getMoradoresDoCondominio() {
        try {
            List<MoradorResponseDTO> moradores = moradorService.getMoradoresDoCondominio();
            return ResponseEntity.ok(moradores);
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