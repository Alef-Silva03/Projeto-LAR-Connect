package com.projeto.larconnect.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projeto.larconnect.dto.CondominioDTO;
import com.projeto.larconnect.model.Condominio;
import com.projeto.larconnect.repository.CondominioRepository;

import jakarta.transaction.Transactional;

@Service
public class CondominioService {
	    
    @Autowired
    private CondominioRepository condominioRepository;
    
    @Transactional
    public Condominio create(CondominioDTO condominioDto) {
        
        // Transferte os atributos da dado para os atributos do novo condomínio
        Condominio novoCondominio = new Condominio();
        novoCondominio.setNomeCondominio(condominioDto.getNomeCondominio());
        novoCondominio.setCep(condominioDto.getCep());
        novoCondominio.setPais(condominioDto.getPais());
        novoCondominio.setEstado(condominioDto.getEstado());
        novoCondominio.setCidade(condominioDto.getCidade());
        novoCondominio.setLogradouro(condominioDto.getLogradouro());
        novoCondominio.setBlocos(condominioDto.getBlocos());
        novoCondominio.setApartamentos(condominioDto.getApartamentos());
        novoCondominio.setNumeroCondominio(condominioDto.getNumeroCondominio());
        
        
        // Salva novo condomínio no banco de dados
        return condominioRepository.save(novoCondominio);
    }
}