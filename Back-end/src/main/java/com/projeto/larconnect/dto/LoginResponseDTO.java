package com.projeto.larconnect.dto;

public class LoginResponseDTO {
    private Long id;
    private String nome;
    private String email;
    private String cpf;
    private String telefone;
    private String perfil;
    private String cargo;
    private String apartamento;
    private String bloco;
    private String vaga;
    private CondominioResponseDTO condominio;
    private String token;

    public LoginResponseDTO() {}

    public LoginResponseDTO(Long id, String nome, String email, String cpf,
                            String telefone, String perfil, String cargo, String apartamento,
                            String bloco, String vaga, CondominioResponseDTO condominio, String token) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.telefone = telefone;
        this.perfil = perfil;
        this.cargo = cargo;
        this.apartamento = apartamento;
        this.bloco = bloco;
        this.vaga = vaga;
        this.condominio = condominio;
        this.token = token;
    }

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

    public String getCargo() { return cargo; }
    public void setCargo(String cargo) { this.cargo = cargo; }

    public String getApartamento() { return apartamento; }
    public void setApartamento(String apartamento) { this.apartamento = apartamento; }

    public String getBloco() { return bloco; }
    public void setBloco(String bloco) { this.bloco = bloco; }

    public String getVaga() { return vaga; }
    public void setVaga(String vaga) { this.vaga = vaga; }

    public CondominioResponseDTO getCondominio() { return condominio; }
    public void setCondominio(CondominioResponseDTO condominio) { this.condominio = condominio; }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}
