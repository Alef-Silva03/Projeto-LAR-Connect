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
import jakarta.persistence.Table;

@Entity														//Informa que a classe criada aqui é uma entidade, ou seja, um tipo de usuário
@Table(name = "usuario")									//Informa que a classe aqui será transformada em uma tabela do banco de dados chamada "usuario"
@Inheritance(strategy = InheritanceType.JOINED)				//Informa que outras classes podem herdar os atributos e métodos desta classe por meio de união de colunas
public class Usuario {										//Cria a classe Usuario
	@Id														//Informa que a chave principal desta classe é um Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)		//Ativa a geração automática de Id
	private Long id;										//Cria o atributo id. Abaixo, são definidos os outros atibutos desta classe que todos os objetos desta classe terão, como nome, email, senha, etc.
	private String nome;

	@Column(unique = true, nullable = false)				//Informa que o atributo e-mail, declarado abaixo, deve ser único (não pode haver um e-mail igual já salvo no banco de dados) e não pode ser vazio.
	private String email;

	@Column(nullable = false)								//Informa que o atributo senha abaixo não pode ser vazio. Todos os objetos Usuario criados devem ter uma senha.
	private String senha;
	private String cpf;
	private String telefone;
	private String perfil;

	@Column(nullable = true)	
	private String condominio;
	
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

	// Método específico para Spring Security
	/*public String getAuthority() {
	    return "ROLE_" + perfil.name(); // Adiciona o prefixo ROLE_
	}*/

	public void setPerfil(String perfil) {
		this.perfil = perfil;
	}

	public String getCondominio() {
		return condominio;
	}

	public void setCondominio(String condominio) {
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