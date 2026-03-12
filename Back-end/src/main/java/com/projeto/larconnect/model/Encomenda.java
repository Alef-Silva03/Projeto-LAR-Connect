package com.projeto.larconnect.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Encomenda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String morador; 
    private String descricao;
    private String apartamento;
    private String bloco;
    private String dataChegada;
    private LocalDateTime dataEntrega; // Para o histórico
    private boolean entregue = false;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getMorador() {
		return morador;
	}
	public void setMorador(String morador) {
		this.morador = morador;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public String getApartamento() {
		return apartamento;
	}
	public void setApartamento(String apartamento) {
		this.apartamento = apartamento;
	}
	public String getBloco() {
		return bloco;
	}
	public void setBloco(String bloco) {
		this.bloco = bloco;
	}
	public String getDataChegada() {
		return dataChegada;
	}
	public void setDataChegada(String dataChegada) {
		this.dataChegada = dataChegada;
	}
	public LocalDateTime getDataEntrega() {
		return dataEntrega;
	}
	public void setDataEntrega(LocalDateTime dataEntrega) {
		this.dataEntrega = dataEntrega;
	}
	public boolean isEntregue() {
		return entregue;
	}
	public void setEntregue(boolean entregue) {
		this.entregue = entregue;
	}
}