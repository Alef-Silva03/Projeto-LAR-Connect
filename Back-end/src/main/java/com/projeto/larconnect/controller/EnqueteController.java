package com.projeto.larconnect.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.projeto.larconnect.dto.EnqueteRequestDTO;
import com.projeto.larconnect.dto.EnqueteResponseDTO;
import com.projeto.larconnect.dto.UsuarioResponseDTO;
import com.projeto.larconnect.dto.UsuarioUpdateDTO;
import com.projeto.larconnect.model.Enquete;
import com.projeto.larconnect.service.EnqueteService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/enquetes/api")
public class EnqueteController {

		@Autowired
		private EnqueteService enqueteService;
		
		@PostMapping("/create")
		public ResponseEntity<EnqueteResponseDTO> create(@Valid @RequestBody EnqueteRequestDTO request) {
		    Enquete novaEnquete = enqueteService.create(request);
	        EnqueteResponseDTO novaEnqueteDto = new EnqueteResponseDTO();
	        novaEnqueteDto.setId(novaEnquete.getId());
	        novaEnqueteDto.setTitulo(novaEnquete.getTitulo());
	        novaEnqueteDto.setOpcao1(novaEnquete.getOpcao1());
	        novaEnqueteDto.setOpcao2(novaEnquete.getOpcao2());
	        novaEnqueteDto.setVotosOpcao1(novaEnquete.getVotosOpcao1());
	        novaEnqueteDto.setVotosOpcao2(novaEnquete.getVotosOpcao2());
	        novaEnqueteDto.setData(novaEnquete.getData());
	        novaEnqueteDto.setAtivo(novaEnquete.isAtivo());
	        return ResponseEntity.status(HttpStatus.CREATED).body(novaEnqueteDto);
	    }
		
	    @GetMapping("/listar")
	    public ResponseEntity<List<EnqueteResponseDTO>> listar() {
	        List<EnqueteResponseDTO> enquetes = enqueteService.getEnquetesDoCondominio();
	        return ResponseEntity.ok(enquetes);
	    }
	
    @PutMapping("atualizar/{id}")
    public ResponseEntity<EnqueteResponseDTO> atualizar(@PathVariable Long id, @Valid @RequestBody EnqueteRequestDTO request) {
		Enquete enqueteAtualizada = enqueteService.atualizarEnquete(id, request);
		EnqueteResponseDTO enqueteAtualizadaDto = new EnqueteResponseDTO();
		enqueteAtualizadaDto.setId(enqueteAtualizada.getId());
		enqueteAtualizadaDto.setTitulo(enqueteAtualizada.getTitulo());
		enqueteAtualizadaDto.setOpcao1(enqueteAtualizada.getOpcao1());
		enqueteAtualizadaDto.setOpcao2(enqueteAtualizada.getOpcao2());
		enqueteAtualizadaDto.setVotosOpcao1(enqueteAtualizada.getVotosOpcao1());
		enqueteAtualizadaDto.setVotosOpcao2(enqueteAtualizada.getVotosOpcao2());
		enqueteAtualizadaDto.setData(enqueteAtualizada.getData());
		enqueteAtualizadaDto.setAtivo(enqueteAtualizada.isAtivo());
		return ResponseEntity.ok(enqueteAtualizadaDto);
	}
	
}
