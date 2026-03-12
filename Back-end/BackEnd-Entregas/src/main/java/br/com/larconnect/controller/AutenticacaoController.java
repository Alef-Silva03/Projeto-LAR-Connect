package br.com.larconnect.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.larconnect.model.Usuario;
import br.com.larconnect.repository.UsuarioRepository;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "http://localhost:4200")
public class AutenticacaoController {

    @Autowired
    private UsuarioRepository repo;

    @PostMapping
    public ResponseEntity<?> login(@RequestBody Usuario loginData) {
        // Forçamos a conversão para String para evitar o erro de Object
        String loginInformado = String.valueOf(loginData.getLogin());
        String senhaInformada = String.valueOf(loginData.getSenha());

        Optional<Usuario> userOpt = repo.findByLogin(loginInformado);
        
        if (userOpt.isPresent()) {
            Usuario user = userOpt.get();
            if (user.getSenha().equals(senhaInformada)) {
                return ResponseEntity.ok(user);
            }
        }
        
        return ResponseEntity.status(401).body("Usuário ou senha inválidos");
    }
}