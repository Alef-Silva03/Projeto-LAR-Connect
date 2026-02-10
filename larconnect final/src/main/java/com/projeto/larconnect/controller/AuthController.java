package com.projeto.larconnect.controller;

import com.projeto.larconnect.model.Morador;
import com.projeto.larconnect.model.Perfil;
import com.projeto.larconnect.model.Usuario;
import com.projeto.larconnect.repository.UsuarioRepository;
import com.projeto.larconnect.service.CadastroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Optional;

@Controller
public class AuthController {

    @Autowired private CadastroService usuarioService;
    @Autowired private UsuarioRepository usuarioRepository;
    @Autowired private BCryptPasswordEncoder passwordEncoder;
    
    // CORREÇÃO: Injeção do serviço de armazenamento de arquivos

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/registrar")
    public String exibirFormularioCadastro(Model model) {
        model.addAttribute("morador", new Morador());
        return "cadastro";
    }

    @PostMapping("/registrar")
    public String realizarRegistro(Morador morador, 
                                   @RequestParam("perfil") Perfil perfil, 
                                   RedirectAttributes attr) {
        try {
            usuarioService.registrar(morador, perfil);
            attr.addFlashAttribute("sucesso", "Cadastro realizado com sucesso!");
            return "redirect:/login";
        } catch (Exception e) {
            attr.addFlashAttribute("erro", "Erro: " + e.getMessage());
            return "redirect:/registrar";
        }
    }

	@GetMapping("/home")
	public String redirecionarPorPerfil(Authentication auth) {
	    if (auth != null && auth.getAuthorities().stream()
	            .anyMatch(a -> a.getAuthority().equals("SINDICO"))) {
	        return "redirect:/sindico/dashboard-sindico";
	    } else if (auth != null && auth.getAuthorities().stream()
	            .anyMatch(a -> a.getAuthority().equals("FUNCIONARIO"))) {
	        return "redirect:/funcionario/dashboard-funcionario";
	    } else if (auth != null && auth.getAuthorities().stream()
	            .anyMatch(a -> a.getAuthority().equals("PROPRIETARIO"))) {
	        return "redirect:/proprietario/dashboard-proprietario";
	    } else if (auth != null && auth.getAuthorities().stream()
	            .anyMatch(a -> a.getAuthority().equals("INQUILINO")))  {
	        return "redirect:/sindico/dashboard-sindico";
	    } else {
	        return "redirect:/login";
	    }
	}
}
	
