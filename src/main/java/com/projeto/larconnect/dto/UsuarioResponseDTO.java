package com.projeto.larconnect.dto;

import com.projeto.larconnect.model.Usuario;

public class UsuarioResponseDTO {
	private Long id;
	private String nome;
	private String email;
	private String cpf;
	private String telefone;
	private String perfil;
	private String condominio;
	private String apartamento;
	private String cargo;

	public UsuarioResponseDTO(Usuario usuario) {
		this.id = usuario.getId();
		this.nome = usuario.getNome();
		this.email = usuario.getEmail();
		this.cpf = usuario.getCpf();
		this.telefone = usuario.getTelefone();
		this.perfil = usuario.getPerfil();
		this.apartamento = usuario.getApartamento();
		this.cargo = usuario.getCargo();
	}

	public Long getId() { return id; }
	public void setId(Long id) { this.id = id; }

	public String getNome() { return nome; }
	public void setNome(String nome) { this.nome = nome; }

	public String getEmail() { return email; }
	public void setEmail(String email) { this.email = email; }

	public String getCpf() { return cpf; }
	public void setCpf(String cpf) { this.cpf = cpf; }

	public String getTelefone() { return telefone; }
	public void setTelefone(String telefone) { this.telefone = telefone; }
	
	public String getPerfil() { return perfil; }
	public void setPerfil(String perfil) { this.perfil = perfil; }
	
	public String getCondominio() { return condominio; }
	public void setCondominio(String condominio) { this.condominio = condominio; }
	
	public String getApartamento() { return apartamento; }
	public void setApartamento(String apartamento) { this.apartamento = apartamento; }
	
	public String getCargo() { return cargo; }
	public void setCargo(String cargo) { this.cargo = cargo; }
}
