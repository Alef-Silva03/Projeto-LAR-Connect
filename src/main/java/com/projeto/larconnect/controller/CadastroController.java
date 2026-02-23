package com.projeto.larconnect.controller;

import com.projeto.larconnect.model.Usuario;
import com.projeto.larconnect.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class CadastroController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Exibe página de cadastro
    @GetMapping("/cadastro")
    public String exibirCadastro() {
        return "cadastro";
    }

    // Salva novo usuário
    @PostMapping("/usuarios/salvar")
    public String salvarNovoUsuario(
            HttpServletRequest request,
            @RequestParam("perfil") String perfil,
            RedirectAttributes attr) {

        try {

            Usuario usuario = new Usuario();

            usuario.setNome(request.getParameter("nome"));
            usuario.setEmail(request.getParameter("email"));
            usuario.setCpf(request.getParameter("cpf"));
            usuario.setTelefone(request.getParameter("telefone"));

            // 🔥 GARANTE criptografia correta
            String senhaOriginal = request.getParameter("senha");
            String senhaCriptografada = passwordEncoder.encode(senhaOriginal);

            usuario.setSenha(senhaCriptografada);

            // 🔥 Remove espaços e padroniza perfil
            usuario.setPerfil(perfil.trim().toUpperCase());

            usuarioRepository.save(usuario);

            attr.addFlashAttribute("sucesso", "Cadastro realizado com sucesso!");
            return "redirect:/login";

        } catch (Exception e) {
            e.printStackTrace();
            attr.addFlashAttribute("erro", "Erro ao cadastrar: " + e.getMessage());
            return "redirect:/cadastro";
        }
    }
}