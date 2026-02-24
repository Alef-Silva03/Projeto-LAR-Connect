package br.com.larconnect.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Notificacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String mensagem;
    private LocalDateTime dataCriacao = LocalDateTime.now();
    private boolean lida = false;
    
    @ManyToOne
    private Usuario destinatario; // O morador que vai ver no painel

	public void setDestinatario(Usuario morador) {
		// TODO Auto-generated method stub
		
	}

	public void setMensagem(String string) {
		// TODO Auto-generated method stub
		
	}
}