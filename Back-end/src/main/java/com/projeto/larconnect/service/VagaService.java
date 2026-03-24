package com.projeto.larconnect.service;

import com.projeto.larconnect.dto.AnuncioVagaRequestDTO;
import com.projeto.larconnect.dto.ElegibilidadeAnuncioVagaDTO;
import com.projeto.larconnect.dto.VagaRequestDTO;
import com.projeto.larconnect.dto.VagaResponseDTO;
import com.projeto.larconnect.model.Condominio;
import com.projeto.larconnect.model.StatusCompra;
import com.projeto.larconnect.model.StatusVaga;
import com.projeto.larconnect.model.Usuario;
import com.projeto.larconnect.model.Vaga;
import com.projeto.larconnect.repository.CompraVagaRepository;
import com.projeto.larconnect.repository.CondominioRepository;
import com.projeto.larconnect.repository.UsuarioRepository;
import com.projeto.larconnect.repository.VagaRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VagaService {
    private final VagaRepository vagaRepository;
    private final CondominioRepository condominioRepository;
    private final UsuarioRepository usuarioRepository;
    private final CompraVagaRepository compraVagaRepository;

    public VagaService(
            VagaRepository vagaRepository,
            CondominioRepository condominioRepository,
            UsuarioRepository usuarioRepository,
            CompraVagaRepository compraVagaRepository) {
        this.vagaRepository = vagaRepository;
        this.condominioRepository = condominioRepository;
        this.usuarioRepository = usuarioRepository;
        this.compraVagaRepository = compraVagaRepository;
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
                .orElseThrow(() -> new RuntimeException("Vaga nao encontrada com ID: " + id));
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
            throw new RuntimeException("Ja existe uma vaga com este numero");
        }

        Condominio condominio = condominioRepository.findById(request.getCondominioId())
                .orElseThrow(() -> new RuntimeException("Condominio nao encontrado"));

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
    public VagaResponseDTO anunciarMinhaVaga(AnuncioVagaRequestDTO request) {
        Usuario usuario = getUsuarioAutenticado();
        ElegibilidadeAnuncioVagaDTO elegibilidade = montarElegibilidade(usuario);

        if (!elegibilidade.isPodeAnunciar()) {
            throw new RuntimeException(elegibilidade.getMotivo());
        }

        Long condominioId = usuario.getCondominio().getId();
        Vaga vaga = vagaRepository.findByNumeroAndCondominioId(usuario.getVaga(), condominioId)
                .orElseGet(Vaga::new);

        vaga.setNumero(usuario.getVaga());
        vaga.setBloco(usuario.getBloco() != null && !usuario.getBloco().isBlank() ? usuario.getBloco() : "Sem bloco");
        vaga.setAndar(request.getAndar());
        vaga.setDescricao(request.getDescricao());
        vaga.setPreco(request.getPreco());
        vaga.setCondominio(usuario.getCondominio());
        vaga.setProprietario(usuario);
        vaga.setStatus(StatusVaga.DISPONIVEL);

        Vaga vagaSalva = vagaRepository.save(vaga);
        return converterParaDTO(vagaSalva);
    }

    @Transactional
    public VagaResponseDTO atualizarVaga(Long id, VagaRequestDTO request) {
        Vaga vaga = vagaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vaga nao encontrada"));

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
                .orElseThrow(() -> new RuntimeException("Vaga nao encontrada"));
        vagaRepository.delete(vaga);
    }

    @Transactional
    public void atualizarStatus(Long id, StatusVaga status) {
        Vaga vaga = vagaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vaga nao encontrada"));
        vaga.setStatus(status);
        vagaRepository.save(vaga);
    }

    public ElegibilidadeAnuncioVagaDTO consultarElegibilidadeAnuncio() {
        Usuario usuario = getUsuarioAutenticado();
        return montarElegibilidade(usuario);
    }

    public Usuario getUsuarioAutenticado() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null || "anonymousUser".equals(authentication.getName())) {
            throw new RuntimeException("Usuario nao autenticado");
        }

        return usuarioRepository.findByEmailIgnoreCase(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Usuario nao encontrado"));
    }

    public Optional<Usuario> buscarProprietarioDaVaga(Vaga vaga) {
        if (vaga.getProprietario() != null) {
            return Optional.of(vaga.getProprietario());
        }

        if (vaga.getCondominio() == null) {
            return Optional.empty();
        }

        return usuarioRepository.findByCondominioId(vaga.getCondominio().getId()).stream()
                .filter(usuario -> vaga.getNumero().equalsIgnoreCase(usuario.getVaga()))
                .findFirst();
    }

    private ElegibilidadeAnuncioVagaDTO montarElegibilidade(Usuario usuario) {
        ElegibilidadeAnuncioVagaDTO dto = new ElegibilidadeAnuncioVagaDTO();
        dto.setUsuarioId(usuario.getId());
        dto.setNumeroVaga(usuario.getVaga());
        dto.setBloco(usuario.getBloco());

        if (usuario.getCondominio() != null) {
            dto.setCondominioId(usuario.getCondominio().getId());
            dto.setNomeCondominio(usuario.getCondominio().getNomeCondominio());
        }

        if (usuario.getCondominio() == null) {
            dto.setPodeAnunciar(false);
            dto.setMotivo("Voce precisa estar vinculado a um condominio pelo sindico para anunciar sua vaga.");
            return dto;
        }

        if (usuario.getVaga() == null || usuario.getVaga().isBlank()) {
            dto.setPodeAnunciar(false);
            dto.setMotivo("Voce precisa ter uma vaga registrada no seu cadastro para anunciar.");
            return dto;
        }

        dto.setPodeAnunciar(true);
        dto.setMotivo("Usuario apto a anunciar a vaga.");
        return dto;
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

            buscarProprietarioDaVaga(vaga)
                    .ifPresent(usuario -> {
                        dto.setProprietario(usuario.getNome());
                        dto.setProprietarioId(usuario.getId());
                    });
        }

        compraVagaRepository.findFirstByVagaIdAndStatusOrderByDataCompraDesc(vaga.getId(), StatusCompra.AGUARDANDO_PAGAMENTO)
                .ifPresent(compra -> {
                    dto.setReservaAtivaCompraId(compra.getId());
                    dto.setNomeCompradorReserva(compra.getComprador().getNome());
                });

        return dto;
    }
}
