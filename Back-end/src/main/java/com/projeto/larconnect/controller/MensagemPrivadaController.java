package com.projeto.larconnect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.projeto.larconnect.dto.MensagemPrivadaRequestDTO;
import com.projeto.larconnect.dto.MensagemPrivadaResponseDTO;
import com.projeto.larconnect.dto.ComunicadoResponseDTO;
import com.projeto.larconnect.dto.FuncionarioResponseDTO;
import com.projeto.larconnect.model.MensagemPrivada;
import com.projeto.larconnect.service.MensagemPrivadaService;
import jakarta.validation.Valid;
import java.util.List;

@RestController
public class MensagemPrivadaController {
	@Autowired
	private MensagemPrivadaService mensagemPrivadaService;
	
	@PostMapping("/mensagemPrivada/create")
	public ResponseEntity<MensagemPrivadaResponseDTO> create(@Valid @RequestBody MensagemPrivadaRequestDTO request) {
	    MensagemPrivada novoMensagemPrivada = mensagemPrivadaService.create(request);
        MensagemPrivadaResponseDTO novoMensagemPrivadaDto = new MensagemPrivadaResponseDTO();
        novoMensagemPrivadaDto.setId(novoMensagemPrivada.getId());
        novoMensagemPrivadaDto.setTipo(novoMensagemPrivada.getTipo());
        novoMensagemPrivadaDto.setTitulo(novoMensagemPrivada.getTitulo());
        novoMensagemPrivadaDto.setAssunto(novoMensagemPrivada.getAssunto());
        novoMensagemPrivadaDto.setTexto(novoMensagemPrivada.getTexto());
        novoMensagemPrivadaDto.setData(novoMensagemPrivada.getData());
        novoMensagemPrivadaDto.setDestinatario(novoMensagemPrivada.getDestinatario());
        return ResponseEntity.status(HttpStatus.CREATED).body(novoMensagemPrivadaDto);
    }
	
    @GetMapping("/mensagemPrivada/listar")
    public ResponseEntity<List<MensagemPrivadaResponseDTO>> listar() {
        List<MensagemPrivadaResponseDTO> mensagemPrivada = mensagemPrivadaService.getMensagemPrivadasDoCondominio();
        return ResponseEntity.ok(mensagemPrivada);
    }
    
    @DeleteMapping("/mensagemPrivada/excluir/{id}")
    public ResponseEntity<Void> excluirUsuario(@PathVariable Long id) {
    	mensagemPrivadaService.excluirMensagemPrivada(id);
        return ResponseEntity.noContent().build();
    }
    
}