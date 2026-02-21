// Controlador para as rotas relacionadas ao síndico, incluindo o dashboard do síndico.
// Quando trabalhamos com API REST, precisamos criar controladores específicos para cada tipo de usuário, garantindo que as rotas e as views 
// sejam organizadas de forma clara e eficiente. O SindicoController é responsável por lidar com as requisições relacionadas ao síndico, 
// como acessar o dashboard do síndico, onde ele pode gerenciar as funcionalidades específicas para sua função.

package com.projeto.larconnect.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.projeto.larconnect.model.Usuario;

@Controller
public class SindicoController {

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
    public String painelDeMoradores() {
        return "sindico/painel_de_moradores";
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
