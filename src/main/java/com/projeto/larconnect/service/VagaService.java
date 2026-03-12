package com.projeto.larconnect.service;

import com.projeto.larconnect.dto.VagaRequestDTO;
import com.projeto.larconnect.dto.VagaResponseDTO;
import com.projeto.larconnect.model.Condominio;
import com.projeto.larconnect.model.Vaga;
import com.projeto.larconnect.model.StatusVaga;
import com.projeto.larconnect.repository.CondominioRepository;
import com.projeto.larconnect.repository.VagaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VagaService {
    private final VagaRepository vagaRepository;
    private final CondominioRepository condominioRepository;
    
    public VagaService(VagaRepository vagaRepository, CondominioRepository condominioRepository) {
        this.vagaRepository = vagaRepository;
        this.condominioRepository = condominioRepository;
    }

    public List<VagaResponseDTO> listarTodas() {
        return vagaRepository.findAll().stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    public List<VagaResponseDTO> listarDisponiveis() {
        return vagaRepository.findByStatus(StatusVaga.DISPONIVEL).stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    public VagaResponseDTO buscarPorId(Long id) {
        Vaga vaga = vagaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vaga não encontrada com ID: " + id));
        return converterParaDTO(vaga);
    }

    public List<VagaResponseDTO> buscarPorCondominio(Long condominioId) {
        return vagaRepository.findByCondominioId(condominioId).stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    public List<VagaResponseDTO> buscarPorPreco(BigDecimal min, BigDecimal max) {
        return vagaRepository.findByPrecoBetween(min, max).stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public VagaResponseDTO criarVaga(VagaRequestDTO request) {
        if (vagaRepository.existsByNumero(request.getNumero())) {
            throw new RuntimeException("Já existe uma vaga com este número");
        }

        Condominio condominio = condominioRepository.findById(request.getCondominioId())
                .orElseThrow(() -> new RuntimeException("Condomínio não encontrado"));

        Vaga vaga = new Vaga();
        vaga.setNumero(request.getNumero());
        vaga.setBloco(request.getBloco());
        vaga.setAndar(request.getAndar());
        vaga.setDescricao(request.getDescricao());
        vaga.setPreco(request.getPreco());
        vaga.setCondominio(condominio);
        vaga.setStatus(StatusVaga.DISPONIVEL);

        Vaga vagaSalva = vagaRepository.save(vaga);
        return converterParaDTO(vagaSalva);
    }

    @Transactional
    public VagaResponseDTO atualizarVaga(Long id, VagaRequestDTO request) {
        Vaga vaga = vagaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vaga não encontrada"));

        vaga.setNumero(request.getNumero());
        vaga.setBloco(request.getBloco());
        vaga.setAndar(request.getAndar());
        vaga.setDescricao(request.getDescricao());
        vaga.setPreco(request.getPreco());

        Vaga vagaAtualizada = vagaRepository.save(vaga);
        return converterParaDTO(vagaAtualizada);
    }

    @Transactional
    public void deletarVaga(Long id) {
        Vaga vaga = vagaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vaga não encontrada"));
        vagaRepository.delete(vaga);
    }

    @Transactional
    public void atualizarStatus(Long id, StatusVaga status) {
        Vaga vaga = vagaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vaga não encontrada"));
        vaga.setStatus(status);
        vagaRepository.save(vaga);
    }

    private VagaResponseDTO converterParaDTO(Vaga vaga) {
        VagaResponseDTO dto = new VagaResponseDTO();
        dto.setId(vaga.getId());
        dto.setNumero(vaga.getNumero());
        dto.setBloco(vaga.getBloco());
        dto.setAndar(vaga.getAndar());
        dto.setDescricao(vaga.getDescricao());
        dto.setPreco(vaga.getPreco());
        dto.setStatus(vaga.getStatus());
        dto.setDataCriacao(vaga.getDataCriacao());
        
        if (vaga.getCondominio() != null) {
            dto.setCondominioId(vaga.getCondominio().getId());
            dto.setNomeCondominio(vaga.getCondominio().getNomeCondominio());
        }
        
        return dto;
    }
}