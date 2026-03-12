package br.com.larconnect.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import br.com.larconnect.dto.EncomendaRequestDTO;
import br.com.larconnect.model.Encomenda;
import br.com.larconnect.model.Notificacao;
import br.com.larconnect.model.Usuario;
import br.com.larconnect.repository.EncomendaRepository;
import br.com.larconnect.repository.NotificacaoRepository;
import br.com.larconnect.repository.UsuarioRepository;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Service
public class EncomendaService {

    @Autowired private EncomendaRepository encomendaRepo;
    @Autowired private UsuarioRepository usuarioRepo;
    @Autowired private NotificacaoRepository notificacaoRepo;

    @Transactional
    public Encomenda registrarRecebimento(EncomendaRequestDTO dto) {
        // 1. Localiza o morador no banco pelo Apartamento/Bloco
        Usuario moradorObj = usuarioRepo.findByApartamentoAndBloco(dto.getApartamento(), dto.getBloco())
            .orElseThrow(() -> new RuntimeException("Morador não encontrado no Apartamento " + dto.getApartamento()));

        // 2. Registra a Encomenda
        Encomenda enc = new Encomenda();
        enc.setApartamento(dto.getApartamento());
        enc.setBloco(dto.getBloco());
        enc.setMorador(moradorObj.getNome());
        enc.setDescricao("Encomenda recebida na portaria");
        enc.setDataChegada("Recebido às " + LocalTime.now().toString().substring(0,5));
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