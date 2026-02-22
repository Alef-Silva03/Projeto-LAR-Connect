package com.projeto.larconnect.service;

import com.projeto.larconnect.dto.MoradorResponseDTO;
import com.projeto.larconnect.model.Usuario;
import com.projeto.larconnect.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MoradorService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<MoradorResponseDTO> getMoradoresDoCondominio() {
        // Pega o usuário logado atual
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        
        // Busca o usuário logado
        Usuario usuarioLogado = usuarioRepository.findByEmailIgnoreCase(email)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        // Busca todos os moradores do condomínio do usuário
        Long condominioId = usuarioLogado.getCondominio().getId();
        List<Usuario> moradores = usuarioRepository.findByCondominioId(condominioId);
        
        // Converte para DTO
        return moradores.stream()
            .map(this::convertToDTO)
            .filter(m -> !"FUNCIONARIO".equals(m.getPerfil()))
            .collect(Collectors.toList());
    }
    
    private MoradorResponseDTO convertToDTO(Usuario usuario) {
        return new MoradorResponseDTO(
            usuario.getId(),
            usuario.getNome(),
            usuario.getEmail(),
            usuario.getApartamento(),
            usuario.getPerfil()
        );
    }
    
}