package com.projeto.larconnect.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.projeto.larconnect.dto.MensagemPrivadaResponseDTO;
import com.projeto.larconnect.dto.MensagemPrivadaRequestDTO;
import com.projeto.larconnect.model.MensagemPrivada;
import com.projeto.larconnect.model.Condominio;
import com.projeto.larconnect.model.Usuario;
import com.projeto.larconnect.repository.MensagemPrivadaRepository;
import com.projeto.larconnect.repository.UsuarioRepository;

import jakarta.transaction.Transactional;


@Service
public class MensagemPrivadaService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private MensagemPrivadaRepository mensagemPrivadaRepository;

    @Transactional
    public MensagemPrivada create(MensagemPrivadaRequestDTO request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        Usuario usuarioLogado = usuarioRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado")); 
       
        Condominio condominio = usuarioLogado.getCondominio();
            
        MensagemPrivada novaMensagemPrivada = new MensagemPrivada();
        novaMensagemPrivada.setTipo(request.getTipo());
        novaMensagemPrivada.setTitulo(request.getTitulo());
        novaMensagemPrivada.setAssunto(request.getAssunto());
        novaMensagemPrivada.setTexto(request.getTexto());
        novaMensagemPrivada.setCondominio(condominio);
        novaMensagemPrivada.setAutor(usuarioLogado);
        novaMensagemPrivada.setDestinatario(request.getDestinatario());
        
        return mensagemPrivadaRepository.save(novaMensagemPrivada);
    }
    
    public List<MensagemPrivadaResponseDTO> getMensagemPrivadasDoCondominio() {
        // Pega o usuário logado atual
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        
        // Busca o usuário logado
        Usuario usuarioLogado = usuarioRepository.findByEmailIgnoreCase(email)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        // Busca todos os MensagemPrivadas do condomínio do usuário
        Long condominioId = usuarioLogado.getCondominio().getId();
        List<MensagemPrivada> MensagemPrivada = mensagemPrivadaRepository.findByCondominioId(condominioId);
        
        // Converte para DTO
        return MensagemPrivada.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    private MensagemPrivadaResponseDTO convertToDTO(MensagemPrivada MensagemPrivada) {
        return new MensagemPrivadaResponseDTO(
            MensagemPrivada.getId(), 
            MensagemPrivada.getTipo(),
            MensagemPrivada.getTitulo(),
            MensagemPrivada.getAssunto(),
            MensagemPrivada.getTexto(),
            MensagemPrivada.getData(),
            MensagemPrivada.getAutor(),
            MensagemPrivada.getDestinatario()
        );
    }
    
    public void excluirMensagemPrivada (Long id) {
        mensagemPrivadaRepository.deleteById(id);
    }
   
}
