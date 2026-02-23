package com.projeto.larconnect.controller;

import com.projeto.larconnect.model.Usuario;
import com.projeto.larconnect.repository.UsuarioRepository;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class CadastroController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Exibe a página cadastro.html quando o usuário acessa a URL /cadastro
    @GetMapping("/cadastro")
    public String exibirCadastro() {
        return "cadastro";
    }

    //Ativa o método salvarNovoUsuario quando o usuário acessa a URL "/usuarios/salvar" ao clicar no botão do formulário de cadastro
    @PostMapping("/usuarios/salvar")
    @ResponseBody // Adicionar esta anotação se não estiver retornando JSON
    public ResponseEntity<?> salvarNovoUsuario(
        @RequestParam("nome") String nome,
        @RequestParam("email") String email,
        @RequestParam("senha") String senha,
        @RequestParam("cpf") String cpf,
        @RequestParam("telefone") String telefone,
        @RequestParam("perfil") String perfil
    ) {
        try {
            Usuario usuario = new Usuario();
            usuario.setNome(nome);
            usuario.setEmail(email);
            usuario.setSenha(passwordEncoder.encode(senha));
            usuario.setCpf(cpf);
            usuario.setTelefone(telefone);
            usuario.setPerfil(perfil);

            usuarioRepository.save(usuario);

            Map<String, Object> response = new HashMap<>();
            response.put("id", usuario.getId());
            response.put("nome", usuario.getNome());
            response.put("email", usuario.getEmail());
            response.put("perfil", usuario.getPerfil());
            
            return ResponseEntity.ok(response);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body("Email já cadastrado");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Erro ao cadastrar: " + e.getMessage());
        }
    }
}