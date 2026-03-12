package com.projeto.larconnect.model;


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
    private String reservaChurrasqueira;
    
    @Column(unique = true, nullable = true) 
    private String reservaSalao;
    
    @Column(unique = true, nullable = true) 
    private String reservaPlayground;
          
    @Column(unique = true, nullable = true) 
    private String reservaAcademia;
    
    @Column(unique = true, nullable = true) 
    private String reservaQuadra;
    
    @Column(unique = true, nullable = true) 
    private String reservaCinema;
    
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

	public String getReservaChurrasqueira() {
		return reservaChurrasqueira;
	}

	public void setReservaChurrasqueira(String reservaChurrasqueira) {
		this.reservaChurrasqueira = reservaChurrasqueira;
	}

	public String getReservaSalao() {
		return reservaSalao;
	}

	public void setReservaSalao(String reservaSalao) {
		this.reservaSalao = reservaSalao;
	}

	public String getReservaPlayground() {
		return reservaPlayground;
	}

	public void setReservaPlayground(String reservaPlayground) {
		this.reservaPlayground = reservaPlayground;
	}

	public String getReservaAcademia() {
		return reservaAcademia;
	}

	public void setReservaAcademia(String reservaAcademia) {
		this.reservaAcademia = reservaAcademia;
	}

	public String getReservaQuadra() {
		return reservaQuadra;
	}

	public void setReservaQuadra(String reservaQuadra) {
		this.reservaQuadra = reservaQuadra;
	}

	public String getReservaCinema() {
		return reservaCinema;
	}

	public void setReservaCinema(String reservaCinema) {
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