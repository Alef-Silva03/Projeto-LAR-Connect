package com.projeto.larconnect.controller;

import com.projeto.larconnect.model.Funcionario;
import com.projeto.larconnect.model.Morador;
import com.projeto.larconnect.model.Usuario;
import com.projeto.larconnect.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
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
    public String salvarNovoUsuario(HttpServletRequest request, 
                                   @RequestParam("perfil") String perfil,
                                   RedirectAttributes attr) {
        try {
            Usuario usuario;

            if (perfil == "INQUILINO" || perfil == "PROPRIETARIO" || perfil == "SINDICO") {
                usuario = new Morador();
            } else {
                usuario = new Funcionario();
            }

            // Dados comuns a ambos (Morador e Funcionário)
            usuario.setNome(request.getParameter("nome"));
            usuario.setEmail(request.getParameter("email"));
            usuario.setSenha(passwordEncoder.encode(request.getParameter("senha")));
            usuario.setCpf(request.getParameter("cpf"));
            usuario.setTelefone(request.getParameter("telefone"));
            usuario.setPerfil(perfil);

            usuarioRepository.save(usuario);

            attr.addFlashAttribute("sucesso", "Cadastro realizado com sucesso!");
            return "redirect:/login";

        } catch (Exception e) {
            attr.addFlashAttribute("erro", "Erro ao cadastrar: " + e.getMessage());
            return "redirect:/cadastro";
        }
    }
}