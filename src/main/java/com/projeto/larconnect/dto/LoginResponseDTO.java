package com.projeto.larconnect.dto;

public class LoginResponseDTO {
    private Long id;
    private String nome;
    private String email;
    private String cpf;
    private String telefone;
    private String perfil;
    private String condominio;

    // Default constructor
    public LoginResponseDTO() {}

    // Constructor with all fields
    public LoginResponseDTO(Long id, String nome, String email, String cpf, 
                           String telefone, String perfil, String condominio) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.telefone = telefone;
        this.perfil = perfil;
        this.condominio = condominio;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getPerfil() { return perfil; }
    public void setPerfil(String perfil) { this.perfil = perfil; }

    public String getCondominio() { return condominio; }
    public void setCondominio(String condominio) { this.condominio = condominio; }
}