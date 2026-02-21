//Esse arquivo cria a classe Usuário, que será transformada na tabela Usuário do banco de dados

package com.projeto.larconnect.model;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity														
@Table(name = "condominio")
public class Condominio {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
    @Column(unique = true, nullable = false)
	private String nomeCondominio;
    
	@Column(nullable = false)
	private String cep;
	private String pais;
	private String estado;
	private String cidade;
	private String logradouro;
	private long numeroCondominio;
	private long blocos;
	private long apartamentos;
	
    @OneToMany(mappedBy = "condominio")
    @JsonIgnore
    private List<Usuario> membros;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNomeCondominio() {
		return nomeCondominio;
	}
	public void setNomeCondominio(String nomeCondominio) {
		this.nomeCondominio = nomeCondominio;
	}
	public String getCep() {
		return cep;
	}
	public void setCep(String cep) {
		this.cep = cep;
	}
	public String getPais() {
		return pais;
	}
	public void setPais(String pais) {
		this.pais = pais;
	}
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	public String getCidade() {
		return cidade;
	}
	public void setCidade(String cidade) {
		this.cidade = cidade;
	}
	public String getLogradouro() {
		return logradouro;
	}
	public void setLogradouro(String logradouro) {
		this.logradouro = logradouro;
	}
	public long getBlocos() {
		return blocos;
	}
	public void setBlocos(long blocos) {
		this.blocos = blocos;
	}
	public long getApartamentos() {
		return apartamentos;
	}
	public void setApartamentos(long apartamentos) {
		this.apartamentos = apartamentos;
	}
	public long getNumeroCondominio() {
		return numeroCondominio;
	}
	public void setNumeroCondominio(long numeroCondominio) {
		this.numeroCondominio = numeroCondominio;
	}
    public List<Usuario> getMembros() {
        return membros;
    }
    public void setMembros(List<Usuario> membros) {
        this.membros = membros;
    }
}