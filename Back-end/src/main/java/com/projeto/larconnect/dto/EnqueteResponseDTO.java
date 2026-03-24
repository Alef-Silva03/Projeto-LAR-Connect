package com.projeto.larconnect.dto;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;

public class EnqueteResponseDTO {
	private Long id;
    private String titulo;
    private String opcao1;
    private String opcao2;
    private int votosOpcao1;
    private int votosOpcao2;
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
	private LocalDateTime data;
    private boolean ativo;
    
	
    public EnqueteResponseDTO() {}

    public EnqueteResponseDTO(Long id, String titulo, String opcao1, String opcao2, int votosOpcao1, int votosOpcao2, LocalDateTime data, boolean ativo) {
		this.id = id;
		this.titulo = titulo;
		this.opcao1 = opcao1;
		this.opcao2 = opcao2;
		this.votosOpcao1 = votosOpcao1;
		this.votosOpcao2 = votosOpcao2;
		this.data = data;
		this.ativo = ativo;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getOpcao1() {
		return opcao1;
	}

	public void setOpcao1(String opcao1) {
		this.opcao1 = opcao1;
	}

	public String getOpcao2() {
		return opcao2;
	}

	public void setOpcao2(String opcao2) {
		this.opcao2 = opcao2;
	}

	public int getVotosOpcao1() {
		return votosOpcao1;
	}

	public void setVotosOpcao1(int votosOpcao1) {
		this.votosOpcao1 = votosOpcao1;
	}

	public int getVotosOpcao2() {
		return votosOpcao2;
	}

	public void setVotosOpcao2(int votosOpcao2) {
		this.votosOpcao2 = votosOpcao2;
	}

	public LocalDateTime getData() {
		return data;
	}

	public void setData(LocalDateTime data) {
		this.data = data;
	}

	public boolean isAtivo() {
		return ativo;
	}

	public void setAtivo(boolean ativo) {
		this.ativo = ativo;
	}
}
