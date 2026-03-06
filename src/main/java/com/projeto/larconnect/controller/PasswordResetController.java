package com.projeto.larconnect.controller;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.projeto.larconnect.service.PasswordResetService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class PasswordResetController {

	@Autowired
	private PasswordResetService service;

	@PostMapping("/redefinir-senha")
	public ResponseEntity<?> solicitarReset(@RequestBody Map<String, String> body) {
		String email = body.get("email");

		if (email == null || email.isBlank()) {
			return ResponseEntity.badRequest().body(Map.of("mensagem", "Email é obrigatório"));
		}

		try {
			String token = service.solicitarReset(email);
			return ResponseEntity.ok(Map.of("mensagem", "Token de redefinição gerado com sucesso.", "token", token));
		} catch (RuntimeException e) {
			if ("Email não encontrado".equals(e.getMessage())) {
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("mensagem", e.getMessage()));
			}
			return ResponseEntity.badRequest().body(Map.of("mensagem", e.getMessage()));
		}
	}

	@PostMapping("/nova-senha")
	public ResponseEntity<?> salvarNovaSenha(@RequestBody Map<String, String> body) {
		String token = body.get("token");
		String novaSenha = body.get("novaSenha");
		String confirmarSenha = body.get("confirmarSenha");

		if (token == null || token.isBlank()) {
			return ResponseEntity.badRequest().body(Map.of("mensagem", "Token é obrigatório."));
		}

		if (novaSenha == null || novaSenha.isBlank()) {
			return ResponseEntity.badRequest().body(Map.of("mensagem", "Nova senha é obrigatória."));
		}

		if (confirmarSenha != null && !novaSenha.equals(confirmarSenha)) {
			return ResponseEntity.badRequest().body(Map.of("mensagem", "As senhas não coincidem."));
		}

		try {
			service.redefinirSenha(token, novaSenha);
			return ResponseEntity.ok(Map.of("mensagem", "Senha alterada com sucesso."));
		} catch (RuntimeException e) {
			return ResponseEntity.badRequest().body(Map.of("mensagem", e.getMessage()));
		}
	}

	@GetMapping("/validar-token/{token}")
	public ResponseEntity<?> validarToken(@PathVariable String token) {
		try {
			service.validarToken(token);
			return ResponseEntity.ok(Map.of("valido", true));
		} catch (RuntimeException e) {
			return ResponseEntity.badRequest().body(Map.of("mensagem", e.getMessage()));
		}
	}

}