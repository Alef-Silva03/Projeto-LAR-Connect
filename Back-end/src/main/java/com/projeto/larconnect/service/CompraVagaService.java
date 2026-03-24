package com.projeto.larconnect.service;

import com.projeto.larconnect.dto.CompraVagaRequestDTO;
import com.projeto.larconnect.dto.PagamentoRequestDTO;
import com.projeto.larconnect.dto.CompraVagaResponseDTO;
import com.projeto.larconnect.dto.PagamentoResponseDTO;
import com.projeto.larconnect.dto.VagaResponseDTO;
import com.projeto.larconnect.model.*;
import com.projeto.larconnect.repository.CompraVagaRepository;
import com.projeto.larconnect.repository.PagamentoVagaRepository;
import com.projeto.larconnect.repository.UsuarioRepository;
import com.projeto.larconnect.repository.VagaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CompraVagaService {
    private final CompraVagaRepository compraRepository;
    private final VagaRepository vagaRepository;
    private final UsuarioRepository usuarioRepository;
    private final PagamentoVagaRepository pagamentoRepository;
    private final VagaService vagaService;

    public CompraVagaService(
            CompraVagaRepository compraRepository,
            VagaRepository vagaRepository,
            UsuarioRepository usuarioRepository,
            PagamentoVagaRepository pagamentoRepository,
            VagaService vagaService) {
        this.compraRepository = compraRepository;
        this.vagaRepository = vagaRepository;
        this.usuarioRepository = usuarioRepository;
        this.pagamentoRepository = pagamentoRepository;
        this.vagaService = vagaService;
    }

    public List<CompraVagaResponseDTO> listarTodas() {
        return compraRepository.findAll().stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    public CompraVagaResponseDTO buscarPorId(Long id) {
        CompraVaga compra = compraRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Compra nao encontrada com ID: " + id));
        return converterParaDTO(compra);
    }

    public List<CompraVagaResponseDTO> buscarPorUsuario(Long usuarioId) {
        return compraRepository.findByCompradorId(usuarioId).stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public CompraVagaResponseDTO iniciarCompra(CompraVagaRequestDTO request) {
        Vaga vaga = vagaRepository.findById(request.getVagaId())
                .orElseThrow(() -> new RuntimeException("Vaga nao encontrada"));

        if (vaga.getStatus() != StatusVaga.DISPONIVEL) {
            throw new RuntimeException("Vaga nao esta disponivel para compra");
        }

        Usuario comprador = usuarioRepository.findById(request.getCompradorId())
                .orElseThrow(() -> new RuntimeException("Usuario nao encontrado"));

        Usuario proprietario = vagaService.buscarProprietarioDaVaga(vaga)
                .orElseThrow(() -> new RuntimeException("Nao foi possivel identificar o proprietario da vaga"));

        if (proprietario.getId().equals(comprador.getId())) {
            throw new RuntimeException("Voce nao pode comprar a sua propria vaga.");
        }

        if (compraRepository.existsByVagaIdAndStatus(vaga.getId(), StatusCompra.AGUARDANDO_PAGAMENTO)) {
            throw new RuntimeException("Ja existe uma reserva ativa para esta vaga.");
        }

        CompraVaga compra = new CompraVaga();
        compra.setVaga(vaga);
        compra.setComprador(comprador);
        compra.setStatus(StatusCompra.AGUARDANDO_PAGAMENTO);
        compra.setDataCompra(LocalDateTime.now());
        compra.setObservacoes(request.getObservacoes());

        vaga.setStatus(StatusVaga.RESERVADA);
        vagaRepository.save(vaga);

        CompraVaga compraSalva = compraRepository.save(compra);
        return converterParaDTO(compraSalva);
    }

    @Transactional
    public PagamentoResponseDTO processarPagamento(PagamentoRequestDTO request) {
        CompraVaga compra = compraRepository.findById(request.getCompraId())
                .orElseThrow(() -> new RuntimeException("Compra nao encontrada"));

        if (compra.getStatus() != StatusCompra.AGUARDANDO_PAGAMENTO) {
            throw new RuntimeException("Esta compra nao esta aguardando pagamento");
        }

        PagamentoVaga pagamento = new PagamentoVaga();
        pagamento.setCompra(compra);
        pagamento.setMetodoPagamento(request.getMetodoPagamento());
        pagamento.setValor(compra.getVaga().getPreco());
        pagamento.setStatusPagamento(StatusPagamento.PROCESSANDO);
        pagamento.setDataVencimento(LocalDateTime.now().plusDays(1));
        pagamento.setTransacaoId(UUID.randomUUID().toString());

        if (request.getMetodoPagamento() == MetodoPagamento.PIX) {
            pagamento.setCodigoPix(UUID.randomUUID().toString().replace("-", "").substring(0, 32));
        } else if (request.getMetodoPagamento() == MetodoPagamento.BOLETO) {
            pagamento.setLinhaDigitavelBoleto(UUID.randomUUID().toString().replace("-", "").substring(0, 47));
        } else if (request.getMetodoPagamento() == MetodoPagamento.CARTAO_CREDITO ||
                request.getMetodoPagamento() == MetodoPagamento.CARTAO_DEBITO) {
            pagamento.setNumeroCartao(mascararCartao(request.getNumeroCartao()));
            pagamento.setBandeiraCartao(identificarBandeira(request.getNumeroCartao()));
        }

        PagamentoVaga pagamentoSalvo = pagamentoRepository.save(pagamento);
        compra.setPagamento(pagamentoSalvo);
        compraRepository.save(compra);

        return converterPagamentoParaDTO(pagamentoSalvo);
    }

    @Transactional
    public CompraVagaResponseDTO confirmarPagamento(Long compraId, String transacaoId) {
        CompraVaga compra = compraRepository.findById(compraId)
                .orElseThrow(() -> new RuntimeException("Compra nao encontrada"));

        PagamentoVaga pagamento = compra.getPagamento();
        pagamento.setStatusPagamento(StatusPagamento.APROVADO);
        pagamento.setDataPagamento(LocalDateTime.now());
        pagamentoRepository.save(pagamento);

        compra.setStatus(StatusCompra.PAGAMENTO_CONFIRMADO);
        compra.setDataConfirmacao(LocalDateTime.now());

        Vaga vaga = compra.getVaga();
        vaga.setProprietario(compra.getComprador());
        vaga.setStatus(StatusVaga.VENDIDA);
        vagaRepository.save(vaga);

        CompraVaga compraAtualizada = compraRepository.save(compra);
        return converterParaDTO(compraAtualizada);
    }

    @Transactional
    public CompraVagaResponseDTO aprovarReserva(Long compraId) {
        CompraVaga compra = compraRepository.findById(compraId)
                .orElseThrow(() -> new RuntimeException("Compra nao encontrada"));

        validarProprietarioDaReserva(compra);

        if (compra.getStatus() != StatusCompra.AGUARDANDO_PAGAMENTO) {
            throw new RuntimeException("Esta reserva nao pode mais ser aprovada.");
        }

        compra.setStatus(StatusCompra.CONCLUIDA);
        compra.setDataConfirmacao(LocalDateTime.now());

        if (compra.getPagamento() != null) {
            compra.getPagamento().setStatusPagamento(StatusPagamento.APROVADO);
            compra.getPagamento().setDataPagamento(LocalDateTime.now());
            pagamentoRepository.save(compra.getPagamento());
        }

        Vaga vaga = compra.getVaga();
        vaga.setProprietario(compra.getComprador());
        vaga.setStatus(StatusVaga.VENDIDA);
        vagaRepository.save(vaga);

        return converterParaDTO(compraRepository.save(compra));
    }

    @Transactional
    public CompraVagaResponseDTO recusarReserva(Long compraId) {
        CompraVaga compra = compraRepository.findById(compraId)
                .orElseThrow(() -> new RuntimeException("Compra nao encontrada"));

        validarProprietarioDaReserva(compra);

        if (compra.getStatus() != StatusCompra.AGUARDANDO_PAGAMENTO) {
            throw new RuntimeException("Esta reserva nao pode mais ser recusada.");
        }

        compra.setStatus(StatusCompra.CANCELADA);
        compra.setDataCancelamento(LocalDateTime.now());

        if (compra.getPagamento() != null) {
            compra.getPagamento().setStatusPagamento(StatusPagamento.ESTORNADO);
            pagamentoRepository.save(compra.getPagamento());
        }

        Vaga vaga = compra.getVaga();
        vaga.setStatus(StatusVaga.DISPONIVEL);
        vagaRepository.save(vaga);

        return converterParaDTO(compraRepository.save(compra));
    }

    @Transactional
    public CompraVagaResponseDTO cancelarCompra(Long compraId) {
        CompraVaga compra = compraRepository.findById(compraId)
                .orElseThrow(() -> new RuntimeException("Compra nao encontrada"));

        if (compra.getStatus() == StatusCompra.CONCLUIDA) {
            throw new RuntimeException("Nao e possivel cancelar uma compra concluida");
        }

        compra.setStatus(StatusCompra.CANCELADA);
        compra.setDataCancelamento(LocalDateTime.now());

        Vaga vaga = compra.getVaga();
        vaga.setStatus(StatusVaga.DISPONIVEL);
        vagaRepository.save(vaga);

        if (compra.getPagamento() != null) {
            compra.getPagamento().setStatusPagamento(StatusPagamento.ESTORNADO);
        }

        CompraVaga compraCancelada = compraRepository.save(compra);
        return converterParaDTO(compraCancelada);
    }

    private void validarProprietarioDaReserva(CompraVaga compra) {
        Usuario usuarioLogado = vagaService.getUsuarioAutenticado();
        Usuario proprietario = vagaService.buscarProprietarioDaVaga(compra.getVaga())
                .orElseThrow(() -> new RuntimeException("Nao foi possivel identificar o proprietario da vaga"));

        if (!proprietario.getId().equals(usuarioLogado.getId())) {
            throw new RuntimeException("Apenas o proprietario da vaga pode concluir esta acao.");
        }
    }

    private CompraVagaResponseDTO converterParaDTO(CompraVaga compra) {
        CompraVagaResponseDTO dto = new CompraVagaResponseDTO();
        dto.setId(compra.getId());
        dto.setVaga(converterVagaParaDTO(compra.getVaga()));
        dto.setCompradorId(compra.getComprador().getId());
        dto.setNomeComprador(compra.getComprador().getNome());
        dto.setStatus(compra.getStatus());
        dto.setDataCompra(compra.getDataCompra());
        dto.setDataConfirmacao(compra.getDataConfirmacao());
        dto.setObservacoes(compra.getObservacoes());

        if (compra.getPagamento() != null) {
            dto.setPagamento(converterPagamentoParaDTO(compra.getPagamento()));
        }

        return dto;
    }

    private VagaResponseDTO converterVagaParaDTO(Vaga vaga) {
        VagaResponseDTO dto = new VagaResponseDTO();
        dto.setId(vaga.getId());
        dto.setNumero(vaga.getNumero());
        dto.setBloco(vaga.getBloco());
        dto.setAndar(vaga.getAndar());
        dto.setDescricao(vaga.getDescricao());
        dto.setPreco(vaga.getPreco());
        dto.setStatus(vaga.getStatus());
        return dto;
    }

    private PagamentoResponseDTO converterPagamentoParaDTO(PagamentoVaga pagamento) {
        PagamentoResponseDTO dto = new PagamentoResponseDTO();
        dto.setId(pagamento.getId());
        dto.setMetodoPagamento(pagamento.getMetodoPagamento());
        dto.setStatusPagamento(pagamento.getStatusPagamento());
        dto.setValor(pagamento.getValor());
        dto.setDataPagamento(pagamento.getDataPagamento());
        dto.setDataVencimento(pagamento.getDataVencimento());
        dto.setTransacaoId(pagamento.getTransacaoId());
        dto.setCodigoPix(pagamento.getCodigoPix());
        dto.setLinhaDigitavelBoleto(pagamento.getLinhaDigitavelBoleto());
        return dto;
    }

    private String mascararCartao(String numeroCartao) {
        if (numeroCartao == null || numeroCartao.length() < 4) return "****";
        return "**** **** **** " + numeroCartao.substring(numeroCartao.length() - 4);
    }

    private String identificarBandeira(String numeroCartao) {
        if (numeroCartao == null) return "Desconhecida";
        if (numeroCartao.startsWith("4")) return "Visa";
        if (numeroCartao.startsWith("5")) return "Mastercard";
        if (numeroCartao.startsWith("3")) return "American Express";
        if (numeroCartao.startsWith("6")) return "Discover";
        return "Outra";
    }
}
