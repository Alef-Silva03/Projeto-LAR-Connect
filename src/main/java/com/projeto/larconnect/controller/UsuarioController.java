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
     
	 // Aqui você criamos os métodos para lidar com as operações de CRUD dos usuários por meio da ativação dos serviços do UsuarioService.
	 
	 // Lógica para buscar o usuário por ID e retornar um DTO
	 //@GetMapping("/{id}")
	 //public ResponseEntity<UsuarioDTO> getUsuarioById(@PathVariable Long id) {

	 //}
	 
	 // Lógica para criar um novo usuário e retornar um DTO
	 //@PostMapping
	 //public ResponseEntity<UsuarioDTO> createUsuario(@RequestBody UsuarioCreateDTO createDto) {

	 //}
	
	 // Lógica para atualizar um usuário alguns dados de um usuário existente (patch) e retornar um DTO
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
	 
	 // @DeleteMapping("/{id}")
	 // public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
	 //     // Lógica para deletar um usuário por ID
	 // }
}
