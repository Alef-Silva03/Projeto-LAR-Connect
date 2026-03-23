package com.projeto.larconnect.dto;

import java.sql.Date;

public class ReservaRequestDTO {
	    private Date dataReserva;
	    private String local;
	    private Long idCondominio;
	    private Long idUsuario;
	    
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
		public Long getIdCondominio() {
			return idCondominio;
		}
		public void setIdCondominio(Long idCondominio) {
			this.idCondominio = idCondominio;
		}
		public Long getIdUsuario() {
			return idUsuario;
		}
		public void setIdUsuario(Long idUsuario) {
			this.idUsuario = idUsuario;
		}
}
