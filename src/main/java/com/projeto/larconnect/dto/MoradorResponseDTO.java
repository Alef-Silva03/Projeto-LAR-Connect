package com.projeto.larconnect.dto;

public class MoradorResponseDTO {
    private Long id;
    private String nome;
    private String email;
    private String apartamento;
    private String perfil;

    public MoradorResponseDTO() {}

    public MoradorResponseDTO(Long id, String nome, String email, String apartamento, String perfil) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.apartamento = apartamento;
        this.perfil = perfil;
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getApartamento() { return apartamento; }
    public void setApartamento(String apartamento) { this.apartamento = apartamento; }

    public String getPerfil() { return perfil; }
    public void setPerfil(String perfil) { this.perfil = perfil; }
}