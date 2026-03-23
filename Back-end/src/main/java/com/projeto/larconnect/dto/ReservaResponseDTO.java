package com.projeto.larconnect.dto;

import java.sql.Date;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.projeto.larconnect.model.Usuario;

public class ReservaResponseDTO {
    private Date dataReserva;
    private String local;
	private Usuario usuario;
	
	public ReservaResponseDTO() {}
	
	public ReservaResponseDTO(Date dataReserva, String local, Usuario usuario) {
        this.dataReserva = dataReserva;
        this.local = local;
        this.usuario = usuario;
	}

	public Date getDataReserva() {
		return dataReserva;
	}

	public void setDataReserva(Date dataReserva) {
		this.dataReserva = dataReserva;
	}

	public String getLocal() {
		return local;
	}

	public void setLocal(String local) {
		this.local = local;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
}
