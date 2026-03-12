package com.projeto.larconnect.model;

import com.projeto.larconnect.model.StatusCompra;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "compras_vagas")
public class CompraVaga {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "vaga_id", nullable = false)
    private Vaga vaga;
    
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario comprador;
    
    @OneToOne(mappedBy = "compra", cascade = CascadeType.ALL)
    private PagamentoVaga pagamento;
    
    @Enumerated(EnumType.STRING)
    private StatusCompra status = StatusCompra.PENDENTE;
    
    @Column(name = "data_compra", nullable = false)
    private LocalDateTime dataCompra = LocalDateTime.now();
    
    @Column(name = "data_confirmacao")
    private LocalDateTime dataConfirmacao;
    
    @Column(name = "data_cancelamento")
    private LocalDateTime dataCancelamento;
    
    private String observacoes;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Vaga getVaga() {
		return vaga;
	}

	public void setVaga(Vaga vaga) {
		this.vaga = vaga;
	}

	public Usuario getComprador() {
		return comprador;
	}

	public void setComprador(Usuario comprador) {
		this.comprador = comprador;
	}

	public PagamentoVaga getPagamento() {
		return pagamento;
	}

	public void setPagamento(PagamentoVaga pagamento) {
		this.pagamento = pagamento;
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

	public LocalDateTime getDataCancelamento() {
		return dataCancelamento;
	}

	public void setDataCancelamento(LocalDateTime dataCancelamento) {
		this.dataCancelamento = dataCancelamento;
	}

	public String getObservacoes() {
		return observacoes;
	}

	public void setObservacoes(String observacoes) {
		this.observacoes = observacoes;
	}
    
}