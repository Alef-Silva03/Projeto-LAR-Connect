package com.projeto.larconnect.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;

public class VagaRequestDTO {
    @NotBlank(message = "Número da vaga é obrigatório")
    private String numero;
    
    @NotBlank(message = "Bloco é obrigatório")
    private String bloco;
    
    private String andar;
    
    @NotBlank(message = "Descrição é obrigatória")
    private String descricao;
    
    @NotNull(message = "Preço é obrigatório")
    @Positive(message = "Preço deve ser positivo")
    private BigDecimal preco;
    
    @NotNull(message = "ID do condomínio é obrigatório")
    private Long condominioId;

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getBloco() {
		return bloco;
	}

	public void setBloco(String bloco) {
		this.bloco = bloco;
	}

	public String getAndar() {
		return andar;
	}

	public void setAndar(String andar) {
		this.andar = andar;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public BigDecimal getPreco() {
		return preco;
	}

	public void setPreco(BigDecimal preco) {
		this.preco = preco;
	}

	public Long getCondominioId() {
		return condominioId;
	}

	public void setCondominioId(Long condominioId) {
		this.condominioId = condominioId;
	}
    
}