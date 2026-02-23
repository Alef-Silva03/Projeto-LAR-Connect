package com.projeto.larconnect.controllerPaginas;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RedefinirSenhaController {
	 @GetMapping("/redefinir_senha")
	    public String redefinirSenha() {
	        return "redefinir_senha";
	    }	
}