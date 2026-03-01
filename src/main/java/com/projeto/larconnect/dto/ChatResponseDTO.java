package com.projeto.larconnect.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.projeto.larconnect.model.Usuario;

public class ChatResponseDTO {
	private Long id;
	private String texto;
	
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private LocalDateTime data;
	
	private Usuario usuario;
	
	public ChatResponseDTO() {}
	
	public ChatResponseDTO(Long id, String texto, LocalDateTime data, Usuario usuario) {
        this.id = id;
        this.texto = texto;
        this.data = data;
        this.usuario = usuario;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
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
	
	public Usuario getUsuario() {
		return usuario;
	}
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
}
