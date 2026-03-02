package com.projeto.larconnect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.larconnect.dto.ComunicadoRequestDTO;
import com.projeto.larconnect.dto.ComunicadoResponseDTO;
import com.projeto.larconnect.dto.FuncionarioResponseDTO;
import com.projeto.larconnect.model.Comunicado;
import com.projeto.larconnect.model.Condominio;
import com.projeto.larconnect.model.Reserva;
import com.projeto.larconnect.model.Usuario;
import com.projeto.larconnect.repository.ReservaRepository;
import com.projeto.larconnect.repository.UsuarioRepository;
import com.projeto.larconnect.service.ComunicadoService;

import jakarta.validation.Valid;

import java.sql.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class ReservaController {

    @Autowired
    private ReservaRepository reservaRepository;
	
	@PostMapping("/reservas/create")
	@ResponseBody
	public ResponseEntity<?> createReserva(
	        @RequestParam("reservaChurrasqueira") Date reservaChurrasqueira,
	        @RequestParam("reservaSalao") Date reservaSalao,
	        @RequestParam("reservaPlayground") Date reservaPlayground,
	        @RequestParam("reservaAcademia") Date reservaAcademia,
	        @RequestParam("reservaQuadra") Date reservaQuadra,
	        @RequestParam("reservaCinema") Date reservaCinema,
	        @RequestParam("idCondominio") Condominio idCondominio,
	        @RequestParam("idUsuario") Usuario idUsuario
	) {
		
        try {
            Reserva reserva = new Reserva();
            reserva.setReservaChurrasqueira(reservaChurrasqueira);
            reserva.setReservaSalao(reservaSalao);
            reserva.setReservaPlayground(reservaPlayground);
            reserva.setReservaAcademia(reservaAcademia);
            reserva.setReservaQuadra(reservaQuadra);
            reserva.setReservaCinema(reservaCinema);
            reserva.setCondominio(idCondominio);
            reserva.setUsuario(idUsuario);

            reservaRepository.save(reserva);

            Map<String, Object> response = new HashMap<>();
            response.put("id", reserva.getId());
            
            return ResponseEntity.ok(response);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body("Reserva já cadastrada para esta data");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Erro ao cadastrar: " + e.getMessage());
        }
    }
}