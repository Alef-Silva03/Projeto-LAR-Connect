package com.projeto.larconnect.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.projeto.larconnect.dto.ComunicadoRequestDTO;
import com.projeto.larconnect.dto.ComunicadoResponseDTO;
import com.projeto.larconnect.dto.CondominioDTO;
import com.projeto.larconnect.model.Comunicado;
import com.projeto.larconnect.model.Condominio;
import com.projeto.larconnect.model.Usuario;
import com.projeto.larconnect.repository.ComunicadoRepository;
import com.projeto.larconnect.repository.UsuarioRepository;

import jakarta.transaction.Transactional;


@Service
public class ChatService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ComunicadoRepository comunicadoRepository;

    @Transactional
    public Comunicado create(ComunicadoRequestDTO request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        Usuario usuarioLogado = usuarioRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado")); 
       
        Condominio condominio = usuarioLogado.getCondominio();
            
        Comunicado novoComunicado = new Comunicado();
        novoComunicado.setTipo(request.getTipo());
        novoComunicado.setTitulo(request.getTitulo());
        novoComunicado.setTexto(request.getTexto());
        novoComunicado.setCondominio(condominio);
        
        return comunicadoRepository.save(novoComunicado);
    }
    
    public List<ComunicadoResponseDTO> getComunicadosDoCondominio() {
        // Pega o usuário logado atual
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        
        // Busca o usuário logado
        Usuario usuarioLogado = usuarioRepository.findByEmailIgnoreCase(email)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        // Busca todos os comunicados do condomínio do usuário
        Long condominioId = usuarioLogado.getCondominio().getId();
        List<Comunicado> comunicado = comunicadoRepository.findByCondominioIdOrderByIdDesc(condominioId);
        
        // Converte para DTO
        return comunicado.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    private ComunicadoResponseDTO convertToDTO(Comunicado comunicado) {
        return new ComunicadoResponseDTO(
            comunicado.getId(),
            comunicado.getTipo(),
            comunicado.getTitulo(),
            comunicado.getTexto(),
            comunicado.getData()
        );
    }
    
    public void excluirComunicado (Long id) {
        comunicadoRepository.deleteById(id);
    }
   
}
