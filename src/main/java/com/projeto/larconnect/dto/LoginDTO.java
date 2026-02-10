//Este arquivo cria uma classe que impõe as regras que devem ser seguidas quando o usuário faz login e que armazena os dados que o usuário informou no login (email e senha)

package com.projeto.larconnect.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class LoginDTO {						//Cria a classe LoginDTO. DTO = Objeto de Transferência de Dados, ou seja, os objetos desta classe servem para armazenar os dados informados pelo usuário na página de login
											//e enviá-los 
    @NotBlank @Email
    private String email;
    @NotBlank
    private String senha;

    public String getEmail() { 
    	return email; 
    	}
    
    public void setEmail(String email) { 
    	this.email = email; 
    	}
    
    public String getSenha() { 
    	return senha; 
    	}
    
    public void setSenha(String senha) { 
    	this.senha = senha; 
    	}
}