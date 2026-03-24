package com.projeto.larconnect.dto;

import java.time.LocalDateTime;

public class EnqueteRequestDTO {
    private String titulo;
    private String opcao1;
    private String opcao2;
    private int votosOpcao1;
    private int votosOpcao2;
	private LocalDateTime data;
    private boolean ativo;
    
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