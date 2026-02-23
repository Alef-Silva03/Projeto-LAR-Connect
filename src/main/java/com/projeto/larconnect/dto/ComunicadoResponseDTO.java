package com.projeto.larconnect.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

public class ComunicadoResponseDTO {
	private Long id;
	private String tipo;
	private String titulo;
	private String texto;
	
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss", timezone = "America/Sao_Paulo")
	private LocalDateTime data;
	
    public ComunicadoResponseDTO() {}

    public ComunicadoResponseDTO(Long id, String tipo, String titulo, String texto, LocalDateTime data) {
        this.id = id;
        this.tipo = tipo;
        this.titulo = titulo;
        this.texto = texto;
        this.data = data;
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
}
