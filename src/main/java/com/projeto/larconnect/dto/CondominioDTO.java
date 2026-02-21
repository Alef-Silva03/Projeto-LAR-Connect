package com.projeto.larconnect.dto;

public class CondominioDTO {
	private String nomeCondominio;
	private String cep;
	private String pais;
	private String estado;
	private String cidade;
	private String logradouro;
	private long numeroCondominio;
	private long blocos;
	private long apartamentos;
	
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
}
