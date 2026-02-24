package br.com.larconnect.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.com.larconnect.dto.EncomendaRequestDTO;
import br.com.larconnect.model.Encomenda;
import br.com.larconnect.model.Usuario;
import br.com.larconnect.repository.EncomendaRepository;
import br.com.larconnect.repository.NotificacaoRepository;
import br.com.larconnect.repository.UsuarioRepository;

@Service // Indica que esta classe é um serviço
public class EncomendaService {

    @Autowired private EncomendaRepository encomendaRepo;
    @Autowired private UsuarioRepository usuarioRepo;
    @Autowired private NotificacaoRepository notificacaoRepo;

    @Transactional // Garante que se algo der errado (ex: erro ao salvar notificação), nada seja salvo no banco
    public Encomenda registrarRecebimento(EncomendaRequestDTO dto) {
        
        // 1. Busca o morador (Se não existir, ele para aqui e avisa o erro)
        Usuario moradorObj = usuarioRepo.findByAptoAndBloco(dto.getApto(), dto.getBloco())
            .orElseThrow(() -> new RuntimeException("Morador não encontrado no Apto " + dto.getApto() + " Bloco " + dto.getBloco()));

        // 2. Cria a encomenda preenchendo os dados
        Encomenda enc = new Encomenda();
        enc.setApto(dto.getApto());
        enc.setBloco(dto.getBloco());
        enc.setMorador(moradorObj.getNome()); // Pega o nome real do morador que está no banco
        enc.setDescricao("Encomenda recebida na portaria");
        enc.setDataChegada("Hoje, " + java.time.LocalTime.now().toString().substring(0,5));
        enc.setEntregue(false);
        
        // Salva a encomenda no MySQL
        return encomendaRepo.save(enc);
    }
}