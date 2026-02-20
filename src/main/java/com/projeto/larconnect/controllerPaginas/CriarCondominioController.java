// Controlador para as rotas relacionadas ao síndico, incluindo o dashboard do síndico.
// Quando trabalhamos com API REST, precisamos criar controladores específicos para cada tipo de usuário, garantindo que as rotas e as views 
// sejam organizadas de forma clara e eficiente. O SindicoController é responsável por lidar com as requisições relacionadas ao síndico, 
// como acessar o dashboard do síndico, onde ele pode gerenciar as funcionalidades específicas para sua função.

package com.projeto.larconnect.controllerPaginas;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CriarCondominioController {

	@GetMapping("/criar_condominio")
	public String redirecionar(Authentication auth) {
	    if (auth != null) {
	    	return "/criar_condominio";
	    } else {
	        return "redirect:/login";
	    }
	}
}