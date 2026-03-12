// Source code is decompiled from a .class file using FernFlower decompiler (from Intellij IDEA).
package com.projeto.larconnect.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(
   name = "usuario"
)
public class Usuario {
   @Id
   @GeneratedValue(
      strategy = GenerationType.IDENTITY
   )
   private Long id;
   @Column(
      nullable = false
   )
   private String nome;
   @Column(
      unique = true,
      nullable = false
   )
   private String email;
   @Column(
      nullable = false
   )
   private String senha;
   @Column(
      nullable = false
   )
   private String cpf;
   @Column(
      nullable = false
   )
   private String telefone;
   @Column(
      nullable = false
   )
   private String perfil;
   @Column(
      nullable = true
   )
   private String apartamento;
   @Column(
      nullable = true
   )
   private String cargo;
   @Column(
      nullable = true
   )
   private String bloco;
   @Column(
      nullable = true
   )
   private String vaga;
   @OneToMany(
      mappedBy = "comprador",
      cascade = {CascadeType.ALL}
   )
   private List<CompraVaga> comprasVagas = new ArrayList();
   @ManyToOne
   @JoinColumn(
      name = "idCondominio",
      referencedColumnName = "id"
   )
   private Condominio condominio;
   @Column(
      name = "reset_token"
   )
   private String resetToken;
   @Column(
      name = "token_expiration"
   )
   private LocalDateTime tokenExpiration;

   public Usuario() {
   }

   public Long getId() {
      return this.id;
   }

   public void setId(Long id) {
      this.id = id;
   }

   public String getNome() {
      return this.nome;
   }

   public void setNome(String nome) {
      this.nome = nome;
   }

   public String getEmail() {
      return this.email;
   }

   public void setEmail(String email) {
      this.email = email;
   }

   public String getSenha() {
      return this.senha;
   }

   public void setSenha(String senha) {
      this.senha = senha;
   }

   public String getCpf() {
      return this.cpf;
   }

   public void setCpf(String cpf) {
      this.cpf = cpf;
   }

   public String getTelefone() {
      return this.telefone;
   }

   public void setTelefone(String telefone) {
      this.telefone = telefone;
   }

   public String getPerfil() {
      return this.perfil;
   }

   public void setPerfil(String perfil) {
      this.perfil = perfil;
   }

   public String getApartamento() {
      return this.apartamento;
   }

   public void setApartamento(String apartamento) {
      this.apartamento = apartamento;
   }

   public String getCargo() {
      return this.cargo;
   }

   public void setCargo(String cargo) {
      this.cargo = cargo;
   }

   public String getBloco() {
      return this.bloco;
   }

   public void setBloco(String bloco) {
      this.bloco = bloco;
   }

   public String getVaga() {
      return this.vaga;
   }

   public void setVaga(String vaga) {
      this.vaga = vaga;
   }

   public List<CompraVaga> getComprasVagas() {
      return this.comprasVagas;
   }

   public void setComprasVagas(List<CompraVaga> comprasVagas) {
      this.comprasVagas = comprasVagas;
   }

   public Condominio getCondominio() {
      return this.condominio;
   }

   public void setCondominio(Condominio condominio) {
      this.condominio = condominio;
   }

   public String getResetToken() {
      return this.resetToken;
   }

   public void setResetToken(String resetToken) {
      this.resetToken = resetToken;
   }

   public LocalDateTime getTokenExpiration() {
      return this.tokenExpiration;
   }

   public void setTokenExpiration(LocalDateTime tokenExpiration) {
      this.tokenExpiration = tokenExpiration;
   }
}
