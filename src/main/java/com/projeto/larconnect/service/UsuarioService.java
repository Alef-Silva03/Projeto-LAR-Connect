// Source code is decompiled from a .class file using FernFlower decompiler (from Intellij IDEA).
package com.projeto.larconnect.service;

import com.projeto.larconnect.dto.UsuarioUpdateDTO;
import com.projeto.larconnect.model.Condominio;
import com.projeto.larconnect.model.Usuario;
import com.projeto.larconnect.repository.CondominioRepository;
import com.projeto.larconnect.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import java.io.PrintStream;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UsuarioService {
   @Autowired
   private UsuarioRepository usuarioRepository;
   @Autowired
   private CondominioRepository condominioRepository;

   public UsuarioService() {}

   @Transactional
   public Usuario update(String email, UsuarioUpdateDTO usuarioUpdateDto) {
      Usuario usuario = (Usuario)this.usuarioRepository.findByEmailIgnoreCase(email).orElseThrow(() -> new EntityNotFoundException("Usuario não encontrado com e-mail: " + email));
      if (usuarioUpdateDto.getIdCondominio() != null) {
         Condominio condominio = (Condominio)this.condominioRepository.findById(usuarioUpdateDto.getIdCondominio()).orElseThrow(() -> new EntityNotFoundException("Condomínio não encontrado com ID: " + usuarioUpdateDto.getIdCondominio()));
         usuario.setCondominio(condominio);
      }

      if (usuarioUpdateDto.getNome() != null) {
         usuario.setNome(usuarioUpdateDto.getNome());
      }

      if (usuarioUpdateDto.getCpf() != null) {
         usuario.setCpf(usuarioUpdateDto.getCpf());
      }

      if (usuarioUpdateDto.getTelefone() != null) {
         usuario.setTelefone(usuarioUpdateDto.getTelefone());
      }

      if (usuarioUpdateDto.getSenha() != null) {
         usuario.setSenha(usuarioUpdateDto.getSenha());
      }

      if (usuarioUpdateDto.getEmail() != null) {
         usuario.setEmail(usuarioUpdateDto.getEmail());
      }

      if (usuarioUpdateDto.getApartamento() != null) {
         usuario.setApartamento(usuarioUpdateDto.getApartamento());
      }

      if (usuarioUpdateDto.getBloco() != null) {
         usuario.setBloco(usuarioUpdateDto.getBloco());
      }

      if (usuarioUpdateDto.getVaga() != null) {
         usuario.setVaga(usuarioUpdateDto.getVaga());
      }

      if (usuarioUpdateDto.getCargo() != null) {
         usuario.setCargo(usuarioUpdateDto.getCargo());
      }

      Usuario usuarioSalvo = (Usuario)this.usuarioRepository.save(usuario);
      PrintStream var10000 = System.out;
      Object var10001 = usuarioSalvo.getCondominio() != null ? usuarioSalvo.getCondominio().getId() : "NULL";
      var10000.println("Usuário salvo. Condomínio no usuário salvo: " + String.valueOf(var10001));
      return usuarioSalvo;
   }

   @Transactional
   public String gerarTokenRecuperacao(String email) {
      Usuario usuario = (Usuario)this.usuarioRepository.findByEmailIgnoreCase(email).orElseThrow(() -> new RuntimeException("E-mail não encontrado"));
      String token = UUID.randomUUID().toString();
      usuario.setResetToken(token);
      this.usuarioRepository.save(usuario);
      return token;
   }
}
