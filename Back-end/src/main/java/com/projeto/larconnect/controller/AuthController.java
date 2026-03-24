package com.projeto.larconnect.controller;

import com.projeto.larconnect.dto.CondominioResponseDTO;
import com.projeto.larconnect.dto.LoginDTO;
import com.projeto.larconnect.dto.LoginResponseDTO;
import com.projeto.larconnect.model.Condominio;
import com.projeto.larconnect.model.Usuario;
import com.projeto.larconnect.repository.UsuarioRepository;
import com.projeto.larconnect.service.UsuarioService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO loginDto, HttpServletRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getSenha())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            HttpSession session = request.getSession(true);
            session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

            Usuario usuario = usuarioRepository.findByEmailIgnoreCase(loginDto.getEmail())
                    .orElseThrow(() -> new RuntimeException("Usuario nao encontrado"));

            String token = usuarioService.gerarTokenRecuperacao(loginDto.getEmail());

            LoginResponseDTO response = montarLoginResponse(usuario, token);
            return ResponseEntity.ok(response);

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou senha invalidos");
        }
    }

    @GetMapping("/status")
    public ResponseEntity<?> checkAuthStatus(Authentication authentication) {
        if (authentication != null && authentication.isAuthenticated()) {
            Usuario usuario = usuarioRepository.findByEmailIgnoreCase(authentication.getName())
                    .orElse(null);

            if (usuario != null) {
                return ResponseEntity.ok(montarLoginResponse(usuario, null));
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario nao autenticado");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        SecurityContextHolder.clearContext();

        Map<String, String> response = new HashMap<>();
        response.put("message", "Logout realizado com sucesso");
        return ResponseEntity.ok(response);
    }

    private LoginResponseDTO montarLoginResponse(Usuario usuario, String token) {
        LoginResponseDTO response = new LoginResponseDTO();
        response.setId(usuario.getId());
        response.setNome(usuario.getNome());
        response.setEmail(usuario.getEmail());
        response.setCpf(usuario.getCpf());
        response.setTelefone(usuario.getTelefone());
        response.setPerfil(usuario.getPerfil());
        response.setCargo(usuario.getCargo());
        response.setApartamento(usuario.getApartamento());
        response.setBloco(usuario.getBloco());
        response.setVaga(usuario.getVaga());
        response.setCondominio(converterCondominio(usuario.getCondominio()));
        response.setToken(token);
        return response;
    }

    private CondominioResponseDTO converterCondominio(Condominio condominio) {
        if (condominio == null) {
            return null;
        }

        CondominioResponseDTO dto = new CondominioResponseDTO();
        dto.setId(condominio.getId());
        dto.setNomeCondominio(condominio.getNomeCondominio());
        dto.setCep(condominio.getCep());
        dto.setPais(condominio.getPais());
        dto.setEstado(condominio.getEstado());
        dto.setCidade(condominio.getCidade());
        dto.setLogradouro(condominio.getLogradouro());
        dto.setNumeroCondominio(condominio.getNumeroCondominio());
        dto.setBlocos(condominio.getBlocos());
        dto.setApartamentos(condominio.getApartamentos());
        return dto;
    }
}
