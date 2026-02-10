package com.projeto.larconnect.dto;

import com.projeto.larconnect.model.Perfil;

public class UsuarioDTO {
	
    private String email;
    private String nome;
    private String senha;
    private Perfil perfil;
    
    // Getters and Setters
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
    public String getSenha() { 
    	return senha; 
    	}
    public void setSenha(String senha) { 
    	this.senha = senha; 
    	}
	public Perfil getPerfil() {
		return perfil;
	}
	public void setPerfil(Perfil perfil) {
		this.perfil = perfil;
	}
        	              
}