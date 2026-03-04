package com.projeto.larconnect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.projeto.larconnect.service.PasswordResetService;

@RestController
@Controller
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true") // URL do Angular
public class PasswordResetController {

    @Autowired
    private PasswordResetService service;

    // 📩 recebe email
    @PostMapping("/redefinir_senha")
    public String solicitarReset(@RequestParam String email) {

        String token = service.solicitarReset(email);

        return "redirect:/nova_senha?token=" + token;
    }

    // 🔐 recebe nova senha
    @PostMapping("/nova_senha")
    public String salvarNovaSenha(
            @RequestParam String token,
            @RequestParam String novaSenha,
            @RequestParam(required = false) String confirmarSenha) {

        if (confirmarSenha != null && !novaSenha.equals(confirmarSenha)) {
            return "redirect:/nova_senha?token=" + token + "&error=senhas_diferentes";
        }

        service.redefinirSenha(token, novaSenha);
        return "redirect:/login?senhaAlterada";
    }
}