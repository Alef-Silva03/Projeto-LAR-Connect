package com.projeto.larconnect.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.projeto.larconnect.dto.ReservaRequestDTO;
import com.projeto.larconnect.dto.ReservaResponseDTO;
import com.projeto.larconnect.model.Condominio;
import com.projeto.larconnect.model.Reserva;
import com.projeto.larconnect.model.Usuario;
import com.projeto.larconnect.repository.CondominioRepository;
import com.projeto.larconnect.repository.ReservaRepository;
import com.projeto.larconnect.repository.UsuarioRepository;

import jakarta.transaction.Transactional;



@Service
public class ReservaService {
	@Autowired
	private ReservaRepository reservaRepository;
	
	@Autowired
	private CondominioRepository condominioRepository;
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Transactional
    public Reserva create(ReservaRequestDTO request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        
        Condominio condominio = condominioRepository.findById(request.getIdCondominio())
                .orElseThrow(() -> new RuntimeException("Condomínio não encontrado"));
        Usuario usuario = usuarioRepository.findById(request.getIdUsuario())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        Reserva reserva = new Reserva();
        reserva.setDataReserva(request.getDataReserva());
        reserva.setLocal(request.getLocal());
        reserva.setCondominio(condominio);
        reserva.setUsuario(usuario);
        
        return reservaRepository.save(reserva);
	}
	
    public List<ReservaResponseDTO> getReservas() {
        // Pega o usuário logado atual
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        
        // Busca o usuário logado
        Usuario usuarioLogado = usuarioRepository.findByEmailIgnoreCase(email)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        // Busca todas as reservas do condomínio do usuário
        Long condominioId = usuarioLogado.getCondominio().getId();
        List<Reserva> reserva = reservaRepository.findByCondominioIdOrderByIdDesc(condominioId);
        
        // Converte para DTO
        return reserva.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }
    
    private ReservaResponseDTO convertToDTO(Reserva reserva) {
        return new ReservaResponseDTO(
            reserva.getDataReserva(),
            reserva.getLocal(),
            reserva.getUsuario()
        );
    }

    public void excluirReserva (Long id) {
        reservaRepository.deleteById(id);
    }
}
