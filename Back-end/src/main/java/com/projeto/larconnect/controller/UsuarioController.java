package com.projeto.larconnect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.larconnect.dto.UsuarioResponseDTO;
import com.projeto.larconnect.dto.UsuarioUpdateDTO;
import com.projeto.larconnect.model.Usuario;
import com.projeto.larconnect.service.UsuarioService;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
	
     @Autowired
     private UsuarioService usuarioService;
     
	
	 // Lógica para atualizar alguns dados de um usuário existente (patch) e retornar um DTO
     @PatchMapping("/{email}")
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
