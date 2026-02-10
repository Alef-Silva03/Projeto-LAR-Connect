package com.projeto.larconnect.service;

import com.projeto.larconnect.model.*;
import com.projeto.larconnect.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.UUID;

@Service
public class CadastroService {

    @Autowired 
    private UsuarioRepository usuarioRepository;
    
    @Autowired 
    private MoradorRepository moradorRepository;
    
    @Autowired 
    private BCryptPasswordEncoder passwordEncoder;

    @Transactional
    public Usuario registrar(Morador morador, Perfil perfil) {
        // Verificar se o e-mail já está cadastrado
        if (usuarioRepository.findByEmailIgnoreCase(morador.getEmail()).isPresent()) {
            throw new RuntimeException("Este e-mail já está cadastrado no sistema.");
        }

        // Criptografar a senha
        String senhaCripto = passwordEncoder.encode(morador.getSenha());

        if ("PROPRIETARIO".equals(perfil.name()) || "INQUILINO".equals(perfil.name()) || "SINDICO".equals(perfil.name())) {
            morador.setSenha(senhaCripto);
            morador.setPerfil(perfil);
            return moradorRepository.save(morador);
        } else {
            // Caso seja Funcionario, criamos um objeto Usuario limpo
            Usuario funcionario = new Usuario();
            funcionario.setEmail(morador.getEmail());
            funcionario.setSenha(senhaCripto);
            funcionario.setPerfil(perfil);
            return usuarioRepository.save(funcionario);
        }
    }

    // Método auxiliar para garantir integridade dos dados (sem pontos ou traços)
    private String apenasNumeros(String valor) {
        if (valor == null) return null;
        return valor.replaceAll("\\D", ""); 
    }

    @Transactional
    public String gerarTokenRecuperacao(String email) {
        Usuario usuario = usuarioRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("E-mail não encontrado"));
        
        String token = UUID.randomUUID().toString();
        usuario.setResetToken(token);
        usuarioRepository.save(usuario);
        return token;
    }
}