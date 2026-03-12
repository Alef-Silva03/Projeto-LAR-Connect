package com.projeto.larconnect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.larconnect.dto.CondominioDTO;
import com.projeto.larconnect.dto.CondominioResponseDTO;
import com.projeto.larconnect.model.Condominio;
import com.projeto.larconnect.service.CondominioService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/sindico/api")

public class CondominioController {
	
	@Autowired
	private CondominioService condominioService;
	
    @PostMapping("/condominio/create")
    public ResponseEntity<CondominioResponseDTO> create(@Valid @RequestBody CondominioDTO condominioDto) {
    	Condominio novoCondominio = condominioService.create(condominioDto);
        CondominioResponseDTO response = convertToDTO(novoCondominio);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    private CondominioResponseDTO convertToDTO(Condominio novoCondominio) {
        CondominioResponseDTO novoCondominioDto = new CondominioResponseDTO();
        novoCondominioDto.setId(novoCondominio.getId());
        novoCondominioDto.setNomeCondominio(novoCondominio.getNomeCondominio());
        novoCondominioDto.setCep(novoCondominio.getCep());
        novoCondominioDto.setPais(novoCondominio.getPais());
        novoCondominioDto.setEstado(novoCondominio.getEstado());
        novoCondominioDto.setCidade(novoCondominio.getCidade());
        novoCondominioDto.setLogradouro(novoCondominio.getLogradouro());
        novoCondominioDto.setNumeroCondominio(novoCondominio.getNumeroCondominio());
        novoCondominioDto.setBlocos(novoCondominio.getBlocos());
        novoCondominioDto.setApartamentos(novoCondominio.getApartamentos());
        return novoCondominioDto;
    }  
}
