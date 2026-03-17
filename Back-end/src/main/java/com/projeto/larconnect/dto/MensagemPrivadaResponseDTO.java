package com.projeto.larconnect.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.projeto.larconnect.model.Usuario;
import com.projeto.larconnect.model.Condominio;

public class MensagemPrivadaResponseDTO {
	private Long id;
	private String tipo;
	private String titulo;
	private String assunto;
	private String texto;
	
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private LocalDateTime data;
	
	private Usuario autor;
	private Usuario destinatario;
	private Condominio condominio;
	
	public MensagemPrivadaResponseDTO() {}
	
	public MensagemPrivadaResponseDTO(Long id, String tipo, String titulo, String assunto, String texto, LocalDateTime data, Condominio condominio, Usuario autor, Usuario destinatario) {
        this.id = id;
        this.tipo = tipo;
        this.titulo = titulo;
        this.assunto = assunto;
        this.texto = texto;
        this.data = data;
        this.condominio = condominio;
        this.autor = autor;
        this.destinatario = destinatario;

	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	public String getAssunto() {
		return assunto;
	}
	public void setAssunto(String assunto) {
		this.assunto = assunto;
	}
	public String getTexto() {
		return texto;
	}
	public void setTexto(String texto) {
		this.texto = texto;
	}
	public LocalDateTime getData() {
		return data;
	}
	public void setData(LocalDateTime data) {
		this.data = data;
	}
	public Usuario getAutor() {
		return autor;
	}
	public void setAutor(Usuario autor) {
		this.autor = autor;
	}
	public Usuario getDestinatario() {
		return destinatario;
	}
	public void setDestinatario(Usuario destinatario) {
		this.destinatario = destinatario;
	}

	public void setCondominio(Condominio condominio) {
		this.condominio = condominio;
	}
	
	public Condominio getCondominio() {
		return condominio;
	}
}
