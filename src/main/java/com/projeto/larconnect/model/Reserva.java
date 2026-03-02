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
@Table(name = "reserva")
@EntityListeners(AuditingEntityListener.class)
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = true) 
    private Date reservaChurrasqueira;
    
    @Column(unique = true, nullable = true) 
    private Date reservaSalao;
    
    @Column(unique = true, nullable = true) 
    private Date reservaPlayground;
          
    @Column(unique = true, nullable = true) 
    private Date reservaAcademia;
    
    @Column(unique = true, nullable = true) 
    private Date reservaQuadra;
    
    @Column(unique = true, nullable = true) 
    private Date reservaCinema;
    
    @ManyToOne
    @JoinColumn(name = "idCondominio", referencedColumnName = "id")
    private Condominio condominio;
    
    @ManyToOne
    @JoinColumn(name = "idUsuario", referencedColumnName = "id")
    private Usuario usuario;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getReservaChurrasqueira() {
		return reservaChurrasqueira;
	}

	public void setReservaChurrasqueira(Date reservaChurrasqueira) {
		this.reservaChurrasqueira = reservaChurrasqueira;
	}

	public Date getReservaSalao() {
		return reservaSalao;
	}

	public void setReservaSalao(Date reservaSalao) {
		this.reservaSalao = reservaSalao;
	}

	public Date getReservaPlayground() {
		return reservaPlayground;
	}

	public void setReservaPlayground(Date reservaPlayground) {
		this.reservaPlayground = reservaPlayground;
	}

	public Date getReservaAcademia() {
		return reservaAcademia;
	}

	public void setReservaAcademia(Date reservaAcademia) {
		this.reservaAcademia = reservaAcademia;
	}

	public Date getReservaQuadra() {
		return reservaQuadra;
	}

	public void setReservaQuadra(Date reservaQuadra) {
		this.reservaQuadra = reservaQuadra;
	}

	public Date getReservaCinema() {
		return reservaCinema;
	}

	public void setReservaCinema(Date reservaCinema) {
		this.reservaCinema = reservaCinema;
	}

	public Condominio getCondominio() {
		return condominio;
	}

	public void setCondominio(Condominio condominio) {
		this.condominio = condominio;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
}