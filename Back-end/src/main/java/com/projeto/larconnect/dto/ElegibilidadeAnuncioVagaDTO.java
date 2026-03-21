package com.projeto.larconnect.dto;

public class ElegibilidadeAnuncioVagaDTO {
    private boolean podeAnunciar;
    private String motivo;
    private Long usuarioId;
    private Long condominioId;
    private String nomeCondominio;
    private String numeroVaga;
    private String bloco;

    public boolean isPodeAnunciar() {
        return podeAnunciar;
    }

    public void setPodeAnunciar(boolean podeAnunciar) {
        this.podeAnunciar = podeAnunciar;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Long getCondominioId() {
        return condominioId;
    }

    public void setCondominioId(Long condominioId) {
        this.condominioId = condominioId;
    }

    public String getNomeCondominio() {
        return nomeCondominio;
    }

    public void setNomeCondominio(String nomeCondominio) {
        this.nomeCondominio = nomeCondominio;
    }

    public String getNumeroVaga() {
        return numeroVaga;
    }

    public void setNumeroVaga(String numeroVaga) {
        this.numeroVaga = numeroVaga;
    }

    public String getBloco() {
        return bloco;
    }

    public void setBloco(String bloco) {
        this.bloco = bloco;
    }
}
