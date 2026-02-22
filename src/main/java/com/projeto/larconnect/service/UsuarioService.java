package com.projeto.larconnect.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Mude para spring transactional

import com.projeto.larconnect.dto.UsuarioUpdateDTO;
import com.projeto.larconnect.model.Condominio;
import com.projeto.larconnect.model.Usuario;
import com.projeto.larconnect.repository.CondominioRepository;
import com.projeto.larconnect.repository.UsuarioRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private CondominioRepository condominioRepository;
    
    @Transactional // ADICIONE ESTA ANOTAÇÃO
    public Usuario update(String email, UsuarioUpdateDTO usuarioUpdateDto) {
        Usuario usuario = usuarioRepository.findByEmailIgnoreCase(email)
            .orElseThrow(() -> new EntityNotFoundException("Usuario não encontrado com e-mail: " + email));
        
        if (usuarioUpdateDto.getIdCondominio() != null) {
            Condominio condominio = condominioRepository.findById(usuarioUpdateDto.getIdCondominio())
                .orElseThrow(() -> new EntityNotFoundException("Condomínio não encontrado com ID: " + usuarioUpdateDto.getIdCondominio()));
            
            usuario.setCondominio(condominio);
        }
        
        // Atualiza outros campos se necessário
        if (usuarioUpdateDto.getNome() != null) {
            usuario.setNome(usuarioUpdateDto.getNome());
        }
        
        if (usuarioUpdateDto.getCpf() != null) {
            usuario.setCpf(usuarioUpdateDto.getCpf());
        }
        
        if (usuarioUpdateDto.getTelefone() != null) {
            usuario.setTelefone(usuarioUpdateDto.getTelefone());
        }
        
        if (usuarioUpdateDto.getSenha() != null) {
			usuario.setSenha(usuarioUpdateDto.getSenha());
		}
        
        if (usuarioUpdateDto.getEmail() != null) {
			usuario.setEmail(usuarioUpdateDto.getEmail());
        }
        
        if (usuarioUpdateDto.getApartamento() != null) {
			usuario.setApartamento(usuarioUpdateDto.getApartamento());
        }
        
        if (usuarioUpdateDto.getCargo() != null) {
        	usuario.setCargo(usuarioUpdateDto.getCargo());
        }
        
    
        
        // Salva e retorna
        Usuario usuarioSalvo = usuarioRepository.save(usuario);
        System.out.println("Usuário salvo. Condomínio no usuário salvo: " + 
            (usuarioSalvo.getCondominio() != null ? usuarioSalvo.getCondominio().getId() : "NULL"));
        
        return usuarioSalvo;
    }
}
