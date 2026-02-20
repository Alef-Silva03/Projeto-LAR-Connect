package com.projeto.larconnect.service;

import com.projeto.larconnect.model.Usuario;
import com.projeto.larconnect.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    
    private static final Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class);

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        logger.info("Tentando carregar usuário com email: {}", email);
        
        Usuario usuario = usuarioRepository.findByEmailIgnoreCase(email)
            .orElseThrow(() -> {
                logger.error("Usuário não encontrado: {}", email);
                return new UsernameNotFoundException("Usuário não encontrado: " + email);
            });
        
        logger.info("Usuário encontrado: {}, Perfil: {}", 
            usuario.getEmail(), usuario.getPerfil());
        
        return org.springframework.security.core.userdetails.User.builder()
			.username(usuario.getEmail())
			.password(usuario.getSenha())
			.roles(usuario.getPerfil()) // Define o perfil como a role do usuário
			.build();
    }
}