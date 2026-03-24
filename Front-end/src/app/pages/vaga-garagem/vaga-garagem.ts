import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { VagaService } from '../../services/vaga.service';
import { ElegibilidadeAnuncioVaga, Vaga } from '../../models/vaga.model';
import { AuthService } from '../../services/auth.service';
import { LoginResponse } from '../../models/usuario.model';

@Component({
  selector: 'app-vaga-garagem',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers: [VagaService],
  templateUrl: './vaga-garagem.html',
  styleUrl: './vaga-garagem.css',
})
export class VagaGaragem implements OnInit {
  vagas: Vaga[] = [];
  todasAsVagas: Vaga[] = [];
  filtroAtivo = 'Todas';
  loading = false;
  error: string | null = null;
  elegibilidade: ElegibilidadeAnuncioVaga | null = null;
  anuncio = {
    descricao: '',
    preco: null as number | null,
    andar: ''
  };

  statusMap: { [key: string]: { text: string; class: string } } = {
    DISPONIVEL: { text: 'DISPONIVEL', class: 'disponivel' },
    RESERVADA: { text: 'RESERVADA', class: 'reservada' },
    VENDIDA: { text: 'VENDIDA', class: 'vendida' },
    INDISPONIVEL: { text: 'INDISPONIVEL', class: 'indisponivel' }
  };

  constructor(
    private vagaService: VagaService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarVagas();
    this.carregarElegibilidade();
  }

  carregarVagas(): void {
    this.loading = true;
    this.error = null;

    this.vagaService.listarVagas().subscribe({
      next: (vagas) => {
        this.todasAsVagas = vagas;
        this.aplicarFiltroAtual();
        this.loading = false;
        this.error = null;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.todasAsVagas = [];
        this.vagas = [];
        this.loading = false;
        this.error = `Erro ao carregar vagas: ${err?.status ?? 'sem status'}`;
        this.cdr.detectChanges();
      },
      complete: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  carregarElegibilidade(): void {
    this.vagaService.consultarElegibilidadeAnuncio().subscribe({
      next: (response) => {
        this.elegibilidade = response;
        this.cdr.detectChanges();
      },
      error: () => {
        this.elegibilidade = {
          podeAnunciar: false,
          motivo: 'Nao foi possivel validar se sua vaga pode ser anunciada agora.'
        };
        this.cdr.detectChanges();
      }
    });
  }

  filtrarVagas(tipo: string): void {
    this.filtroAtivo = tipo;
    this.error = null;
    this.aplicarFiltroAtual();
    this.cdr.detectChanges();
  }

  anunciarMinhaVaga(): void {
    if (!this.elegibilidade?.podeAnunciar) {
      alert(this.elegibilidade?.motivo || 'Sua conta nao pode anunciar vaga no momento.');
      return;
    }

    if (!this.anuncio.descricao.trim() || !this.anuncio.preco || this.anuncio.preco <= 0) {
      alert('Preencha descricao e preco da vaga para anunciar.');
      return;
    }

    this.vagaService.anunciarMinhaVaga({
      descricao: this.anuncio.descricao.trim(),
      preco: this.anuncio.preco,
      andar: this.anuncio.andar || undefined
    }).subscribe({
      next: () => {
        alert('Sua vaga foi anunciada com sucesso.');
        this.anuncio = { descricao: '', preco: null, andar: '' };
        this.filtroAtivo = 'Todas';
        this.carregarVagas();
      },
      error: (err) => {
        alert(err.error?.message || err.error || 'Nao foi possivel anunciar sua vaga.');
      }
    });
  }

  comprarVaga(id: number): void {
    const vaga = this.vagas.find(v => v.id === id);
    const usuario = this.authService.getCurrentUser();

    if (!vaga || vaga.status !== 'DISPONIVEL') {
      alert('Esta vaga nao esta mais disponivel para compra.');
      this.carregarVagas();
      return;
    }

    if (!usuario?.id) {
      alert('Faca login novamente para comprar a vaga.');
      return;
    }

    this.loading = true;
    this.vagaService.comprarVaga(id, usuario.id).subscribe({
      next: () => {
        alert('Pedido de compra enviado para o proprietario da vaga.');
        this.carregarVagas();
      },
      error: (err) => {
        alert(err.error?.message || err.error || 'Erro ao processar compra. Tente novamente.');
        this.loading = false;
      }
    });
  }

  aprovarReserva(vaga: Vaga): void {
    if (!vaga.reservaAtivaCompraId) {
      alert('Nenhuma reserva ativa encontrada para esta vaga.');
      return;
    }

    this.loading = true;
    this.vagaService.aprovarReserva(vaga.reservaAtivaCompraId).subscribe({
      next: () => {
        alert('Venda aprovada com sucesso.');
        this.carregarVagas();
      },
      error: (err) => {
        alert(err.error?.message || err.error || 'Nao foi possivel aprovar a venda.');
        this.loading = false;
      }
    });
  }

  recusarReserva(vaga: Vaga): void {
    if (!vaga.reservaAtivaCompraId) {
      alert('Nenhuma reserva ativa encontrada para esta vaga.');
      return;
    }

    this.loading = true;
    this.vagaService.recusarReserva(vaga.reservaAtivaCompraId).subscribe({
      next: () => {
        alert('Reserva recusada com sucesso.');
        this.carregarVagas();
      },
      error: (err) => {
        alert(err.error?.message || err.error || 'Nao foi possivel recusar a reserva.');
        this.loading = false;
      }
    });
  }

  getBotaoTexto(vaga: Vaga): string {
    if (this.isMinhaVaga(vaga)) {
      return 'SUA VAGA';
    }

    switch (vaga.status) {
      case 'DISPONIVEL':
        return 'COMPRAR';
      case 'RESERVADA':
        return 'RESERVADA';
      case 'VENDIDA':
        return 'VENDIDA';
      case 'INDISPONIVEL':
        return 'INDISPONIVEL';
      default:
        return 'INDISPONIVEL';
    }
  }

  isBotaoHabilitado(vaga: Vaga): boolean {
    return vaga.status === 'DISPONIVEL' && !this.isMinhaVaga(vaga);
  }

  acaoBotao(vaga: Vaga): void {
    if (vaga.status === 'DISPONIVEL' && !this.isMinhaVaga(vaga)) {
      this.comprarVaga(vaga.id);
    }
  }

  isMinhaVaga(vaga: Vaga): boolean {
    const usuario = this.getUsuarioAtual();
    if (!usuario?.id) {
      return false;
    }

    if (vaga.proprietarioId) {
      return vaga.proprietarioId === usuario.id;
    }

    return !!usuario.vaga &&
      !!usuario.condominio?.id &&
      usuario.vaga === vaga.numero &&
      usuario.condominio.id === vaga.condominioId;
  }

  mostrarAcoesReserva(vaga: Vaga): boolean {
    return this.isMinhaVaga(vaga) && vaga.status === 'RESERVADA' && !!vaga.reservaAtivaCompraId;
  }

  formatarValor(vaga: Vaga): string {
    return `R$ ${Number(vaga.preco).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  getStatusClass(status: string): string {
    return this.statusMap[status]?.class || 'indisponivel';
  }

  getStatusText(status: string): string {
    return this.statusMap[status]?.text || status;
  }

  private getUsuarioAtual(): LoginResponse | null {
    return this.authService.getCurrentUser();
  }

  private aplicarFiltroAtual(): void {
    if (this.filtroAtivo === 'Disponíveis para Venda') {
      this.vagas = this.todasAsVagas.filter(vaga => vaga.status === 'DISPONIVEL');
      return;
    }

    this.vagas = [...this.todasAsVagas];
  }
}
