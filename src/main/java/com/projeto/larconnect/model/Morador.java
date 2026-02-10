//Esse arquivo cria a classe Morador, que é uma subclasse da classe Usuario e que será transformada na tabela Morador do banco de dados

package com.projeto.larconnect.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity											//Informa que a classe criada abaixo é uma entidade, ou seja, um tipo de usuário
@Table(name = "morador")						//Informa que a classe abaixo será uma tabela chamada "usuario"
@PrimaryKeyJoinColumn(name = "id")		//Informa que a tabela se relaciona com a tabela Usuario por meio da coluna "usuario_id", que é sua chave estrangeira
public class Morador extends Usuario {	//Cria a classe Morador, informando que é uma subclasse de Usuario (herdando os atributos e métodos de Usuario)
	
	@Column(nullable = true)
	private String apartamento;

	public String getApartamento() {
		return apartamento;
	}

	public void setApartamento(String apartamento) {
		this.apartamento = apartamento;
	}
}
