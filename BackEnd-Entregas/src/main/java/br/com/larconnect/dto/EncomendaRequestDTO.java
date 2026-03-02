package br.com.larconnect.dto;

import lombok.Data;

@Data
public class EncomendaRequestDTO {
    private String apto;
    private String bloco;
    private String moradorNome; // Nome vindo do campo do porteiro
	public String getApto() {
		return apto;
	}
	public void setApto(String apto) {
		this.apto = apto;
	}
	public String getBloco() {
		return bloco;
	}
	public void setBloco(String bloco) {
		this.bloco = bloco;
	}
	public String getMoradorNome() {
		return moradorNome;
	}
	public void setMoradorNome(String moradorNome) {
		this.moradorNome = moradorNome;
	}
}