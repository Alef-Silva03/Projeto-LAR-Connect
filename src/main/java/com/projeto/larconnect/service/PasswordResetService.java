package com.projeto.larconnect.service;

import java.time.LocalDateTime;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.projeto.larconnect.model.Usuario;
import com.projeto.larconnect.repository.UsuarioRepository;

@Service
public class PasswordResetService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // 1️⃣ gera token quando usuário informa email
    public String solicitarReset(String email) {

        Usuario usuario = usuarioRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        String token = UUID.randomUUID().toString();

        usuario.setResetToken(token);
        usuario.setTokenExpiration(LocalDateTime.now().plusMinutes(30));

        usuarioRepository.save(usuario);

        return token;
    }

    // 2️⃣ salva nova senha
    public void redefinirSenha(String token, String novaSenha) {

        Usuario usuario = usuarioRepository.findByResetToken(token)
                .orElseThrow(() -> new RuntimeException("Token inválido"));

        if (usuario.getTokenExpiration().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expirado");
        }

        usuario.setSenha(passwordEncoder.encode(novaSenha));

        usuario.setResetToken(null);
        usuario.setTokenExpiration(null);

        usuarioRepository.save(usuario);
    }
}