package com.projeto.larconnect.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "pagamentos_vagas")
public class PagamentoVaga {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "compra_id", nullable = false, unique = true)
    private CompraVaga compra;
    
    @Enumerated(EnumType.STRING)
    private MetodoPagamento metodoPagamento;
    
    @Enumerated(EnumType.STRING)
    private StatusPagamento statusPagamento = StatusPagamento.PENDENTE;
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal valor;
    
    @Column(name = "data_pagamento")
    private LocalDateTime dataPagamento;
    
    @Column(name = "data_vencimento")
    private LocalDateTime dataVencimento;
    
    @Column(name = "transacao_id", unique = true)
    private String transacaoId;
    
    private String codigoPix;
    private String linhaDigitavelBoleto;
    private String numeroCartao;
    private String bandeiraCartao;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public CompraVaga getCompra() {
		return compra;
	}
	public void setCompra(CompraVaga compra) {
		this.compra = compra;
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
	public String getNumeroCartao() {
		return numeroCartao;
	}
	public void setNumeroCartao(String numeroCartao) {
		this.numeroCartao = numeroCartao;
	}
	public String getBandeiraCartao() {
		return bandeiraCartao;
	}
	public void setBandeiraCartao(String bandeiraCartao) {
		this.bandeiraCartao = bandeiraCartao;
	}
    
}