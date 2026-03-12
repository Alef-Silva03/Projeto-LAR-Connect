package com.projeto.larconnect.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.projeto.larconnect.dto.ChatResponseDTO;
import com.projeto.larconnect.dto.ChatRequestDTO;
import com.projeto.larconnect.model.Chat;
import com.projeto.larconnect.model.Condominio;
import com.projeto.larconnect.model.Usuario;
import com.projeto.larconnect.repository.ChatRepository;
import com.projeto.larconnect.repository.UsuarioRepository;

import jakarta.transaction.Transactional;


@Service
public class ChatService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ChatRepository chatRepository;

    @Transactional
    public Chat create(ChatRequestDTO request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        Usuario usuarioLogado = usuarioRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado")); 
       
        Condominio condominio = usuarioLogado.getCondominio();
            
        Chat novoChat = new Chat();
        novoChat.setTexto(request.getTexto());
        novoChat.setCondominio(condominio);
        novoChat.setUsuario(usuarioLogado);
        
        return chatRepository.save(novoChat);
    }
    
    public List<ChatResponseDTO> getChatsDoCondominio() {
        // Pega o usuário logado atual
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        
        // Busca o usuário logado
        Usuario usuarioLogado = usuarioRepository.findByEmailIgnoreCase(email)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        // Busca todos os chats do condomínio do usuário
        Long condominioId = usuarioLogado.getCondominio().getId();
        List<Chat> chat = chatRepository.findByCondominioIdOrderByIdDesc(condominioId);
        
        // Converte para DTO
        return chat.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    private ChatResponseDTO convertToDTO(Chat chat) {
        return new ChatResponseDTO(
            chat.getId(), 
            chat.getTexto(),
            chat.getData(),
            chat.getUsuario()
        );
    }
    
    public void excluirChat (Long id) {
        chatRepository.deleteById(id);
    }
   
}
