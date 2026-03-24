package com.projeto.larconnect.dto;

import lombok.Data;

@Data
public class EncomendaRequestDTO {
    private String moradorNome;
    private String descricao;
    
	public String getMoradorNome() {
		return moradorNome;
	}
	public void setMoradorNome(String moradorNome) {
		this.moradorNome = moradorNome;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
}