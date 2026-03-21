package com.projeto.larconnect.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public class AnuncioVagaRequestDTO {
    @NotBlank(message = "Descricao e obrigatoria")
    private String descricao;

    @NotNull(message = "Preco e obrigatorio")
    @Positive(message = "Preco deve ser positivo")
    private BigDecimal preco;

    private String andar;

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    public String getAndar() {
        return andar;
    }

    public void setAndar(String andar) {
        this.andar = andar;
    }
}
