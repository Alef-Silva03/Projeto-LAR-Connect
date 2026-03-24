package com.projeto.larconnect.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.projeto.larconnect.dto.ChatResponseDTO;
import com.projeto.larconnect.dto.EnqueteRequestDTO;
import com.projeto.larconnect.dto.EnqueteResponseDTO;
import com.projeto.larconnect.dto.ChatRequestDTO;
import com.projeto.larconnect.model.Chat;
import com.projeto.larconnect.model.Condominio;
import com.projeto.larconnect.model.Enquete;
import com.projeto.larconnect.model.Usuario;
import com.projeto.larconnect.repository.ChatRepository;
import com.projeto.larconnect.repository.EnqueteRepository;
import com.projeto.larconnect.repository.UsuarioRepository;

import jakarta.transaction.Transactional;


@Service
public class EnqueteService {
	@Autowired
	private UsuarioRepository usuarioRepository;
	
    @Autowired
    private EnqueteRepository enqueteRepository;

    @Transactional
    public Enquete create(EnqueteRequestDTO request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        Usuario usuarioLogado = usuarioRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado")); 
       
        Condominio condominio = usuarioLogado.getCondominio();
            
        Enquete novaEnquete = new Enquete();
        novaEnquete.setTitulo(request.getTitulo());
        novaEnquete.setOpcao1(request.getOpcao1());
        novaEnquete.setOpcao2(request.getOpcao2());
        novaEnquete.setData(request.getData());
        novaEnquete.setAtivo(request.isAtivo());
        novaEnquete.setCondominio(condominio);
        
        return enqueteRepository.save(novaEnquete);
    }
    
    public List<EnqueteResponseDTO> getEnquetesDoCondominio() {
        // Pega o usuário logado atual
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        
        // Busca o usuário logado
        Usuario usuarioLogado = usuarioRepository.findByEmailIgnoreCase(email)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        // Busca todos os chats do condomínio do usuário
        Long condominioId = usuarioLogado.getCondominio().getId();
        List<Enquete> enquete = enqueteRepository.findByCondominioId(condominioId);
        
        // Converte para DTO
        return enquete.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    private EnqueteResponseDTO convertToDTO(Enquete enquete) {
        return new EnqueteResponseDTO(
            enquete.getId(),
            enquete.getTitulo(),
            enquete.getOpcao1(),
            enquete.getOpcao2(),
            enquete.getVotosOpcao1(),
            enquete.getVotosOpcao2(),
            enquete.getData(),
            enquete.isAtivo()
        );
    }
    
    public Enquete atualizarEnquete(Long id, EnqueteRequestDTO request) {
		Enquete enqueteExistente = enqueteRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("Enquete não encontrada"));
		
		enqueteExistente.setTitulo(request.getTitulo());
		enqueteExistente.setOpcao1(request.getOpcao1());
		enqueteExistente.setOpcao2(request.getOpcao2());
		enqueteExistente.setVotosOpcao1(request.getVotosOpcao1());
		enqueteExistente.setVotosOpcao2(request.getVotosOpcao2());
		enqueteExistente.setData(request.getData());
		enqueteExistente.setAtivo(request.isAtivo());
		
		return enqueteRepository.save(enqueteExistente);
	}
   
}
