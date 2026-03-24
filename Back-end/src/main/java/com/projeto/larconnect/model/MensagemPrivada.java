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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity														
@Table(name = "mensagemPrivada")
@EntityListeners(AuditingEntityListener.class)
public class MensagemPrivada {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@Column(nullable = true) 
    private String tipo;
    
    @Column(nullable = true) 
    private String titulo;
    
    @Column(nullable = true) 
    private String assunto;

    @Column(nullable = false, length = 10000) 
    private String texto;
          
    @CreatedDate
    @Column(name = "data", updatable = false)
    private LocalDateTime  data;
    
    @ManyToOne
    @JoinColumn(name = "idCondominio", referencedColumnName = "id")
    private Condominio condominio;
    
    @ManyToOne
    @JoinColumn(name = "idAutor", referencedColumnName = "id")
    private Usuario autor;

    @Column(nullable = true) 
    private long destinatario;
    
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
    
    public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	
	public String getAssunto() {
		return assunto;
	}

	public void setAssunto(String assunto) {
		this.assunto = assunto;
	}

	public String getTexto() {
		return texto;
	}

	public void setTexto(String texto) {
		this.texto = texto;
	}

	public LocalDateTime getData() {
		return data;
	}

	public void setData(LocalDateTime data) {
		this.data = data;
	}

	public Condominio getCondominio() {
		return condominio;
	}

	public void setCondominio(Condominio condominio) {
		this.condominio = condominio;
	}

    public Usuario getAutor() {
		return autor;
	}

	public void setAutor(Usuario autor) {
		this.autor = autor;
	}

	public long getDestinatario() {
		return destinatario;
	}

	public void setDestinatario(long destinatario) {
		this.destinatario = destinatario;
	}
}