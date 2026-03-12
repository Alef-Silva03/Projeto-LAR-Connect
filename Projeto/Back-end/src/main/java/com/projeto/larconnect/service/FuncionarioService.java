package com.projeto.larconnect.service;

import com.projeto.larconnect.dto.FuncionarioResponseDTO;
import com.projeto.larconnect.model.Usuario;
import com.projeto.larconnect.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FuncionarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<FuncionarioResponseDTO> getFuncionariosDoCondominio() {
        // Pega o usuário logado atual
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        
        // Busca o usuário logado
        Usuario usuarioLogado = usuarioRepository.findByEmailIgnoreCase(email)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        // Busca todos os funcionarios do condomínio do usuário
        Long condominioId = usuarioLogado.getCondominio().getId();
        List<Usuario> funcionarios = usuarioRepository.findByCondominioId(condominioId);
        
        // Converte para DTO
        return funcionarios.stream()
            .map(this::convertToDTO)
            .filter(m -> "FUNCIONARIO".equals(m.getPerfil()))
            .collect(Collectors.toList());
    }
    
    private FuncionarioResponseDTO convertToDTO(Usuario usuario) {
        return new FuncionarioResponseDTO(
            usuario.getId(),
            usuario.getNome(),
            usuario.getEmail(),
            usuario.getCargo(),
            usuario.getPerfil()
        );
    }
    
}