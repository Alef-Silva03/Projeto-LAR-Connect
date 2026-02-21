//Esse arquivo cria a classe Usuário, que será transformada na tabela Usuário do banco de dados

package com.projeto.larconnect.model;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity														//Informa que a classe criada aqui é uma entidade, ou seja, um tipo de usuário
@Table(name = "usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nome;
    private String email;
    private String senha;
    private String cpf;
    private String telefone;
    private String perfil; // SINDICO, PROPRIETARIO, INQUILINO, FUNCIONARIO
    
    // Campos específicos de morador
    private String apartamento;
    
    // Campos específicos de funcionário
    private String cargo;
    
    @ManyToOne
    @JoinColumn(name = "idCondominio", referencedColumnName = "id")
    private Condominio condominio;
	
	@Column(name = "reset_token")							//Cria um atributo que é um token que será baixado no PC do usuário quando ele logar. Será usado para checar o tempo todo se o usuário está logado.
	private String resetToken;

	@Column(name = "token_expiration")						//Cria um atributo que é o momento em que o token será renovado e baixado no PC do usuário novamente. Técnica de segurança.
	private LocalDateTime tokenExpiration;

	// --- Getters e Setters ---
															//Abaixo são os métodos desta classe, ou seja, o que os objetos dela podem fazer e o que pode ser feito com os atributos deles. Neste caso, podemos
															//salvar os valores de cada atributo de um objeto (setter) ou ver qual o valor de cada atributo de um objeto (getter)
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

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

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getPerfil() {
	    return perfil;
	}

	public void setPerfil(String perfil) {
		this.perfil = perfil;
	}

	public Condominio getCondominio() {
		return condominio;
	}

	public void setCondominio(Condominio condominio) {
		this.condominio = condominio;
	}
	
	public String getResetToken() {
		return resetToken;
	}

	public void setResetToken(String resetToken) {
		this.resetToken = resetToken;
	}

	public LocalDateTime getTokenExpiration() {
		return tokenExpiration;
	}

	public void setTokenExpiration(LocalDateTime tokenExpiration) {
		this.tokenExpiration = tokenExpiration;
	}
}