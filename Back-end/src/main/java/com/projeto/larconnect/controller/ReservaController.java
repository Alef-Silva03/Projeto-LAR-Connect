package com.projeto.larconnect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.projeto.larconnect.dto.ReservaRequestDTO;
import com.projeto.larconnect.model.Condominio;
import com.projeto.larconnect.model.Reserva;
import com.projeto.larconnect.model.Usuario;
import com.projeto.larconnect.repository.CondominioRepository;
import com.projeto.larconnect.repository.ReservaRepository;
import com.projeto.larconnect.repository.UsuarioRepository;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/reservas")
@CrossOrigin(origins = "http://localhost:4200") // permite chamadas do Angular
public class ReservaController {

    @Autowired
    private ReservaRepository reservaRepository;
    
    @Autowired
    private CondominioRepository condominioRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createReserva(@RequestBody ReservaRequestDTO dto) {
        try {
            Reserva reserva = new Reserva();
            reserva.setReservaChurrasqueira(dto.getReservaChurrasqueira());
            reserva.setReservaSalao(dto.getReservaSalao());
            reserva.setReservaPlayground(dto.getReservaPlayground());
            reserva.setReservaAcademia(dto.getReservaAcademia());
            reserva.setReservaQuadra(dto.getReservaQuadra());
            reserva.setReservaCinema(dto.getReservaCinema());

            // Buscar entidades pelo ID
            Condominio condominio = condominioRepository.findById(dto.getIdCondominio())
                    .orElseThrow(() -> new RuntimeException("Condomínio não encontrado"));
            Usuario usuario = usuarioRepository.findById(dto.getIdUsuario())
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

            reserva.setCondominio(condominio);
            reserva.setUsuario(usuario);

            Reserva saved = reservaRepository.save(reserva);

            Map<String, Object> response = new HashMap<>();
            response.put("id", saved.getId());
            response.put("message", "Reserva criada com sucesso!");

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