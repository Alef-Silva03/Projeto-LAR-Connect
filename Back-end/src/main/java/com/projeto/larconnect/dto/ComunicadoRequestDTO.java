package com.projeto.larconnect.dto;

public class ComunicadoRequestDTO {
    private String tipo;
    private String titulo;
    private String texto;

    // getters e setters (ou use Lombok)
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getTexto() { return texto; }
    public void setTexto(String texto) { this.texto = texto; }
}