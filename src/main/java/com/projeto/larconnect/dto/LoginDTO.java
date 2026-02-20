package com.projeto.larconnect.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class LoginDTO {
    
    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email inválido")
    private String email;
    
    @NotBlank(message = "Senha é obrigatória")
    private String senha;

    // Constructors
    public LoginDTO() {}

    public LoginDTO(String email, String senha) {
        this.email = email;
        this.senha = senha;
    }

    // Getters and Setters
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