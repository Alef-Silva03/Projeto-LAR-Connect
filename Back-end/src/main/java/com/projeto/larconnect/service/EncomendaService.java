package com.projeto.larconnect.service;

import java.time.LocalDateTime;
import java.time.LocalTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projeto.larconnect.dto.EncomendaRequestDTO;
import com.projeto.larconnect.model.Encomenda;
import com.projeto.larconnect.model.Notificacao;
import com.projeto.larconnect.model.Usuario;
import com.projeto.larconnect.repository.EncomendaRepository;
import com.projeto.larconnect.repository.NotificacaoRepository;
import com.projeto.larconnect.repository.UsuarioRepository;

@Service
public class EncomendaService {

    @Autowired private EncomendaRepository encomendaRepo;
    @Autowired private UsuarioRepository usuarioRepo;
    @Autowired private NotificacaoRepository notificacaoRepo;

    @Transactional
    public Encomenda registrarRecebimento(EncomendaRequestDTO dto) {
        // 1. Localiza o morador no banco pelo Apartamento/Bloco
        Usuario moradorObj = ((Usuario) usuarioRepo.findByNome(dto.getMoradorNome()));

        // 2. Registra a Encomenda
        Encomenda enc = new Encomenda();
        enc.setMorador(dto.getMoradorNome());
        enc.setDescricao(dto.getDescricao());
        enc.setDataChegada(LocalDateTime.now());
        enc.setEntregue(false);
        
        Encomenda salva = encomendaRepo.save(enc);

        // 3. Cria a Notificação para o Morador
        Notificacao notif = new Notificacao();
        notif.setDestinatario(moradorObj);
        notif.setMensagem("Olá " + moradorObj.getNome() + ", chegou uma encomenda para você!");
        notif.setDataCriacao(LocalDateTime.now());
        notificacaoRepo.save(notif);

        return salva;
    }
}