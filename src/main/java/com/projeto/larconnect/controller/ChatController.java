package com.projeto.larconnect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.projeto.larconnect.dto.ChatRequestDTO;
import com.projeto.larconnect.dto.ChatResponseDTO;
import com.projeto.larconnect.dto.FuncionarioResponseDTO;
import com.projeto.larconnect.model.Chat;
import com.projeto.larconnect.service.ChatService;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/sindico/api")
public class ChatController {
	@Autowired
	private ChatService ChatService;
	
	@PostMapping("/Chats/create")
	public ResponseEntity<ChatResponseDTO> create(@Valid @RequestBody ChatRequestDTO request) {
	    Chat novoChat = ChatService.create(request);
        ChatResponseDTO novoChatDto = new ChatResponseDTO();
        novoChatDto.setId(novoChat.getId());
        novoChatDto.setTexto(novoChat.getTexto());       
        novoChatDto.setData(novoChat.getData());
        return ResponseEntity.status(HttpStatus.CREATED).body(novoChatDto);
    }

    @DeleteMapping("/Chats/excluir/{id}")
    public ResponseEntity<Void> excluirUsuario(@PathVariable Long id) {
        ChatService.excluirChat(id);
        return ResponseEntity.noContent().build();
    }
    
}
