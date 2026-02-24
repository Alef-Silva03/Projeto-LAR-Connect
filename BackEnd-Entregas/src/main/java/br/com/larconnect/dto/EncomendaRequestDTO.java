package br.com.larconnect.dto;

import lombok.Data;

@Data
public class EncomendaRequestDTO {
    private String apto;
    private String bloco;
    private String moradorNome; // Nome vindo do campo do porteiro
}