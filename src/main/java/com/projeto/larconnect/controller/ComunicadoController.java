package com.projeto.larconnect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.larconnect.dto.ComunicadoRequestDTO;
import com.projeto.larconnect.dto.ComunicadoResponseDTO;
import com.projeto.larconnect.dto.FuncionarioResponseDTO;
import com.projeto.larconnect.model.Comunicado;
import com.projeto.larconnect.service.ComunicadoService;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/sindico/api")
public class ComunicadoController {
	@Autowired
	private ComunicadoService comunicadoService;
	
	@PostMapping("/comunicados/create")
	public ResponseEntity<ComunicadoResponseDTO> create(@Valid @RequestBody ComunicadoRequestDTO request) {
	    Comunicado novoComunicado = comunicadoService.create(request);
        ComunicadoResponseDTO novoComunicadoDto = new ComunicadoResponseDTO();
        novoComunicadoDto.setId(novoComunicado.getId());
        novoComunicadoDto.setTipo(novoComunicado.getTipo());
        novoComunicadoDto.setTitulo(novoComunicado.getTitulo());
        novoComunicadoDto.setTexto(novoComunicado.getTexto());
        novoComunicadoDto.setData(novoComunicado.getData());
        return ResponseEntity.status(HttpStatus.CREATED).body(novoComunicadoDto);
    }
    
    @GetMapping("/comunicados/listar")
    public ResponseEntity<List<ComunicadoResponseDTO>> listar() {
        List<ComunicadoResponseDTO> comunicados = comunicadoService.getComunicadosDoCondominio();
        return ResponseEntity.ok(comunicados);
    }
    
}
