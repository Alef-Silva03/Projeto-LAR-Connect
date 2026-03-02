package com.projeto.larconnect.dto;

import com.projeto.larconnect.model.StatusCompra;
import java.time.LocalDateTime;

public class CompraVagaResponseDTO {
    private Long id;
    private VagaResponseDTO vaga;
    private String nomeComprador;
    private Long compradorId;
    private StatusCompra status;
    private LocalDateTime dataCompra;
    private LocalDateTime dataConfirmacao;
    private String observacoes;
    private PagamentoResponseDTO pagamento;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public VagaResponseDTO getVaga() {
		return vaga;
	}
	public void setVaga(VagaResponseDTO vaga) {
		this.vaga = vaga;
	}
	public String getNomeComprador() {
		return nomeComprador;
	}
	public void setNomeComprador(String nomeComprador) {
		this.nomeComprador = nomeComprador;
	}
	public Long getCompradorId() {
		return compradorId;
	}
	public void setCompradorId(Long compradorId) {
		this.compradorId = compradorId;
	}
	public StatusCompra getStatus() {
		return status;
	}
	public void setStatus(StatusCompra status) {
		this.status = status;
	}
	public LocalDateTime getDataCompra() {
		return dataCompra;
	}
	public void setDataCompra(LocalDateTime dataCompra) {
		this.dataCompra = dataCompra;
	}
	public LocalDateTime getDataConfirmacao() {
		return dataConfirmacao;
	}
	public void setDataConfirmacao(LocalDateTime dataConfirmacao) {
		this.dataConfirmacao = dataConfirmacao;
	}
	public String getObservacoes() {
		return observacoes;
	}
	public void setObservacoes(String observacoes) {
		this.observacoes = observacoes;
	}
	public PagamentoResponseDTO getPagamento() {
		return pagamento;
	}
	public void setPagamento(PagamentoResponseDTO pagamento) {
		this.pagamento = pagamento;
	}
    
}