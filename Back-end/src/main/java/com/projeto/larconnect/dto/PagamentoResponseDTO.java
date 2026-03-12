package com.projeto.larconnect.dto;

import com.projeto.larconnect.model.MetodoPagamento;
import com.projeto.larconnect.model.StatusPagamento;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class PagamentoResponseDTO {
    private Long id;
    private MetodoPagamento metodoPagamento;
    private StatusPagamento statusPagamento;
    private BigDecimal valor;
    private LocalDateTime dataPagamento;
    private LocalDateTime dataVencimento;
    private String transacaoId;
    private String codigoPix;
    private String linhaDigitavelBoleto;
    
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public MetodoPagamento getMetodoPagamento() {
		return metodoPagamento;
	}
	public void setMetodoPagamento(MetodoPagamento metodoPagamento) {
		this.metodoPagamento = metodoPagamento;
	}
	public StatusPagamento getStatusPagamento() {
		return statusPagamento;
	}
	public void setStatusPagamento(StatusPagamento statusPagamento) {
		this.statusPagamento = statusPagamento;
	}
	public BigDecimal getValor() {
		return valor;
	}
	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}
	public LocalDateTime getDataPagamento() {
		return dataPagamento;
	}
	public void setDataPagamento(LocalDateTime dataPagamento) {
		this.dataPagamento = dataPagamento;
	}
	public LocalDateTime getDataVencimento() {
		return dataVencimento;
	}
	public void setDataVencimento(LocalDateTime dataVencimento) {
		this.dataVencimento = dataVencimento;
	}
	public String getTransacaoId() {
		return transacaoId;
	}
	public void setTransacaoId(String transacaoId) {
		this.transacaoId = transacaoId;
	}
	public String getCodigoPix() {
		return codigoPix;
	}
	public void setCodigoPix(String codigoPix) {
		this.codigoPix = codigoPix;
	}
	public String getLinhaDigitavelBoleto() {
		return linhaDigitavelBoleto;
	}
	public void setLinhaDigitavelBoleto(String linhaDigitavelBoleto) {
		this.linhaDigitavelBoleto = linhaDigitavelBoleto;
	}
    
}