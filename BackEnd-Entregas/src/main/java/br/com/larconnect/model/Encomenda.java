package br.com.larconnect.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Encomenda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String morador; // Nome do morador (Texto)
    private String descricao; // Adicione esta linha se faltar!
    private String apto;
    private String bloco;
    private String dataChegada;
    private boolean entregue = false;
    
    @ManyToOne
    @JoinColumn(name = "idCondominio", referencedColumnName = "id")
    private Condominio condominio;

	
    public void setEntregue(boolean b) {
		// TODO Auto-generated method stub
		
	}
	public String getApto() {
		// TODO Auto-generated method stub
		return null;
	}
	public String getDescricao() {
		// TODO Auto-generated method stub
		return null;
	}
	public void setDataEntrega(LocalDateTime now) {
		// TODO Auto-generated method stub
		
	}
	public boolean isEntregue() {
		// TODO Auto-generated method stub
		return false;
	}
	
	
	
}