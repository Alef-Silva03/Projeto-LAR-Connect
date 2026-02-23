package com.projeto.larconnect.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.projeto.larconnect.service.PasswordResetService;

@Controller
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