package com.projeto.larconnect.dto;

import com.projeto.larconnect.model.MetodoPagamento;
import jakarta.validation.constraints.NotNull;

public class CompraVagaRequestDTO {
    @NotNull(message = "ID da vaga é obrigatório")
    private Long vagaId;
    
    @NotNull(message = "ID do comprador é obrigatório")
    private Long compradorId;
    
    @NotNull(message = "Método de pagamento é obrigatório")
    private MetodoPagamento metodoPagamento;
    
    private String observacoes;

	public Long getVagaId() {
		return vagaId;
	}

	public void setVagaId(Long vagaId) {
		this.vagaId = vagaId;
	}

	public Long getCompradorId() {
		return compradorId;
	}

	public void setCompradorId(Long compradorId) {
		this.compradorId = compradorId;
	}

	public MetodoPagamento getMetodoPagamento() {
		return metodoPagamento;
	}

	public void setMetodoPagamento(MetodoPagamento metodoPagamento) {
		this.metodoPagamento = metodoPagamento;
	}

	public String getObservacoes() {
		return observacoes;
	}

	public void setObservacoes(String observacoes) {
		this.observacoes = observacoes;
	}
    
}