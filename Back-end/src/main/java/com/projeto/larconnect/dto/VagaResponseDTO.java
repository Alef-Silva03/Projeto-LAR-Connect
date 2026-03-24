package com.projeto.larconnect.dto;

import com.projeto.larconnect.model.StatusVaga;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class VagaResponseDTO {
    private Long id;
    private String numero;
    private String bloco;
    private String andar;
    private String descricao;
    private BigDecimal preco;
    private StatusVaga status;
    private Long condominioId;
    private String nomeCondominio;
    private String proprietario;
    private Long proprietarioId;
    private Long reservaAtivaCompraId;
    private String nomeCompradorReserva;
    private LocalDateTime dataCriacao;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNumero() { return numero; }
    public void setNumero(String numero) { this.numero = numero; }

    public String getBloco() { return bloco; }
    public void setBloco(String bloco) { this.bloco = bloco; }

    public String getAndar() { return andar; }
    public void setAndar(String andar) { this.andar = andar; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public BigDecimal getPreco() { return preco; }
    public void setPreco(BigDecimal preco) { this.preco = preco; }

    public StatusVaga getStatus() { return status; }
    public void setStatus(StatusVaga status) { this.status = status; }

    public Long getCondominioId() { return condominioId; }
    public void setCondominioId(Long condominioId) { this.condominioId = condominioId; }

    public String getNomeCondominio() { return nomeCondominio; }
    public void setNomeCondominio(String nomeCondominio) { this.nomeCondominio = nomeCondominio; }

    public String getProprietario() { return proprietario; }
    public void setProprietario(String proprietario) { this.proprietario = proprietario; }

    public Long getProprietarioId() { return proprietarioId; }
    public void setProprietarioId(Long proprietarioId) { this.proprietarioId = proprietarioId; }

    public Long getReservaAtivaCompraId() { return reservaAtivaCompraId; }
    public void setReservaAtivaCompraId(Long reservaAtivaCompraId) { this.reservaAtivaCompraId = reservaAtivaCompraId; }

    public String getNomeCompradorReserva() { return nomeCompradorReserva; }
    public void setNomeCompradorReserva(String nomeCompradorReserva) { this.nomeCompradorReserva = nomeCompradorReserva; }

    public LocalDateTime getDataCriacao() { return dataCriacao; }
    public void setDataCriacao(LocalDateTime dataCriacao) { this.dataCriacao = dataCriacao; }
}
