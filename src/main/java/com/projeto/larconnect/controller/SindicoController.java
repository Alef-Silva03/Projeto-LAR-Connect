// Controlador para as rotas relacionadas ao síndico, incluindo o dashboard do síndico.
// Quando trabalhamos com API REST, precisamos criar controladores específicos para cada tipo de usuário, garantindo que as rotas e as views 
// sejam organizadas de forma clara e eficiente. O SindicoController é responsável por lidar com as requisições relacionadas ao síndico, 
// como acessar o dashboard do síndico, onde ele pode gerenciar as funcionalidades específicas para sua função.

package com.projeto.larconnect.controller;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import com.projeto.larconnect.model.Morador;
import com.projeto.larconnect.model.Usuario;

@Controller
public class SindicoController {
    public void mostrarUsuario() {

    }

    @GetMapping("/sindico")
    public String raizSindico() {
        org.springframework.security.core.Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Object principal = auth.getPrincipal();
        if (principal instanceof Usuario) {
            Usuario usuario = (Usuario) principal;

            if (usuario.getCondominio() != null) {
                return "redirect:/sindico/dashboard-sindico";
            } else {
                return "redirect:/sindico/criar_condominio";
            }
        }
		return "redirect:/login";
    }

    @GetMapping("/sindico/dashboard-sindico")
    public String dashboardSindico() {
        // Retorna a view Thymeleaf localizada em templates/sindico/dashboard-sindico.html
        return "sindico/dashboard-sindico";
    }
    
    @GetMapping("/sindico/criar_condominio")
    public String criarCondominio() {
        // Retorna a view Thymeleaf localizada em templates/sindico/dashboard-sindico.html
        return "sindico/criar_condominio";
    }
}
