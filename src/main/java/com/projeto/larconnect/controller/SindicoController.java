// Controlador para as rotas relacionadas ao síndico, incluindo o dashboard do síndico.
// Quando trabalhamos com API REST, precisamos criar controladores específicos para cada tipo de usuário, garantindo que as rotas e as views 
// sejam organizadas de forma clara e eficiente. O SindicoController é responsável por lidar com as requisições relacionadas ao síndico, 
// como acessar o dashboard do síndico, onde ele pode gerenciar as funcionalidades específicas para sua função.

package com.projeto.larconnect.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import com.projeto.larconnect.model.Usuario;
import com.projeto.larconnect.repository.UsuarioRepository;

@Controller
public class SindicoController {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
    @GetMapping("/sindico")
    public String raizSindico() {
        Usuario usuario = getCurrentUser();
        
        if (usuario == null || !usuario.getPerfil().equals("SINDICO")) {
            return "redirect:/login";
        }
        return usuario.getCondominio() != null 
            ? "redirect:/sindico/dashboard-sindico" 
            : "redirect:/sindico/criar_condominio";
    }

    @GetMapping("/sindico/dashboard-sindico")
    public String dashboardSindico() {
        return "sindico/dashboard-sindico";
    }
    
    @GetMapping("/sindico/criar_condominio")
    public String criarCondominio() {
        return "sindico/criar_condominio";
    }
    
    @GetMapping("/sindico/painel_de_moradores")
    public String painelDeMoradores(Model model) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String email = auth.getName();
            
            Usuario usuario = usuarioRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
            
            if (usuario.getCondominio() != null) {
                List<Usuario> moradores = usuarioRepository.findMoradoresByCondominioId(usuario.getCondominio().getId());
                model.addAttribute("moradores", moradores);
            }
        } catch (Exception e) {
            model.addAttribute("moradores", List.of());
        }
        
        return "sindico/painel_de_moradores";
    }
    
    @GetMapping("/sindico/painel_de_funcionarios")
    public String painelDeFuncionarios(Model model) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String email = auth.getName();
            
            Usuario usuario = usuarioRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
            
            if (usuario.getCondominio() != null) {
                List<Usuario> funcionarios = usuarioRepository.findMoradoresByCondominioId(usuario.getCondominio().getId());
                model.addAttribute("funcionarios", funcionarios);
            }
        } catch (Exception e) {
            model.addAttribute("funcionarios", List.of());
        }
        return "sindico/painel_de_funcionarios";
    }
    
    @GetMapping("/sindico/enviar_comunicados")
    public String enviarComunicados() {
        return "sindico/enviar_comunicados";
    }
    
    private Usuario getCurrentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Object principal = auth.getPrincipal();
        return principal instanceof Usuario ? (Usuario) principal : null;
    }
}
