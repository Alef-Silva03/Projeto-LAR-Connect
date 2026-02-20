package com.projeto.larconnect.controller;

import com.projeto.larconnect.dto.LoginDTO;
import com.projeto.larconnect.dto.LoginResponseDTO;
import com.projeto.larconnect.model.Usuario;
import com.projeto.larconnect.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO loginDto, HttpServletRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getSenha())
            );
            
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Persistir o SecurityContext na sessão para que o navegador mantenha a autenticação
            HttpSession session = request.getSession(true);
            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());
            
            Usuario usuario = usuarioRepository.findByEmailIgnoreCase(loginDto.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
            
            LoginResponseDTO response = new LoginResponseDTO();
            response.setId(usuario.getId());
            response.setNome(usuario.getNome());
            response.setEmail(usuario.getEmail());
            response.setCpf(usuario.getCpf());
            response.setTelefone(usuario.getTelefone());
            response.setPerfil(usuario.getPerfil()); // Vai retornar "PROPRIETARIO", etc.
            response.setCondominio(usuario.getCondominio());
            
            return ResponseEntity.ok(response);
            
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou senha inválidos");
        }
    }

	
    @GetMapping("/status")
    public ResponseEntity<?> checkAuthStatus(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            Usuario usuario = usuarioRepository.findByEmailIgnoreCase(authentication.getName())
                .orElse(null);
            
            if (usuario != null) {
                LoginResponseDTO response = new LoginResponseDTO(
                        usuario.getId(),
                        usuario.getNome(),
                        usuario.getEmail(),
                        usuario.getCpf(),
                        usuario.getTelefone(),
                        usuario.getPerfil().toString(),
                        usuario.getCondominio()
                    );
                    
                    return ResponseEntity.ok(response);
                }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não autenticado");
    }
}