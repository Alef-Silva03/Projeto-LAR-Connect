package com.projeto.larconnect.model;

import java.sql.Date;
import java.time.LocalDateTime;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity														
@Table(name = "enquete")
@EntityListeners(AuditingEntityListener.class)
public class Enquete {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String titulo;
    
    @Column(nullable = true, length = 1000) 
    private String opcao1;
    
    @Column(nullable = true, length = 1000)
    private String opcao2;
    
    @Column(nullable = false)
    private int votosOpcao1;
    
    @Column(nullable = false)
    private int votosOpcao2;
    
    @CreatedDate
    @Column(name = "data", updatable = false)
    private LocalDateTime  data;
    
    @Column(nullable = false)
    private boolean ativo;
    
    @ManyToOne
    @JoinColumn(name = "idCondominio", referencedColumnName = "id")
    private Condominio condominio;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getOpcao1() {
		return opcao1;
	}

	public void setOpcao1(String opcao1) {
		this.opcao1 = opcao1;
	}

	public String getOpcao2() {
		return opcao2;
	}

	public void setOpcao2(String opcao2) {
		this.opcao2 = opcao2;
	}

	public int getVotosOpcao1() {
		return votosOpcao1;
	}

	public void setVotosOpcao1(int votosOpcao1) {
		this.votosOpcao1 = votosOpcao1;
	}

	public int getVotosOpcao2() {
		return votosOpcao2;
	}

	public void setVotosOpcao2(int votosOpcao2) {
		this.votosOpcao2 = votosOpcao2;
	}

	public LocalDateTime getData() {
		return data;
	}

	public void setData(LocalDateTime data) {
		this.data = data;
	}

	public boolean isAtivo() {
		return ativo;
	}

	public void setAtivo(boolean ativo) {
		this.ativo = ativo;
	}

	public Condominio getCondominio() {
		return condominio;
	}

	public void setCondominio(Condominio condominio) {
		this.condominio = condominio;
	}
}
