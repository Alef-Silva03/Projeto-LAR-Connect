import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { finalize, timeout } from 'rxjs';
import { VagaService } from '../../services/vaga.service';
import { ElegibilidadeAnuncioVaga, Vaga } from '../../models/vaga.model';
import { AuthService } from '../../services/auth.service';

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
  filtroAtivo = 'Todas';
  loading = false;
  error: string | null = null;
  private loadingFallbackId: ReturnType<typeof setTimeout> | null = null;
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
    console.log('carregarVagas iniciou');
  
    this.vagaService.listarVagas().subscribe({
      next: (vagas) => {
        console.log('vagas ok', vagas);
        this.vagas = vagas;
        this.loading = false;
        this.error = null;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('status vagas', err?.status);
        console.log('erro vagas', err);
        this.vagas = [];
        this.loading = false;
        this.error = `Erro ao carregar vagas: ${err?.status ?? 'sem status'}`;
        this.cdr.detectChanges();
      },
      complete: () => {
        console.log('carregarVagas complete');
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
      error: (err) => {
        console.error('Erro ao consultar elegibilidade:', err);
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

    if (tipo === 'Todas') {
      this.carregarVagas();
      return;
    }

    this.loading = true;
    this.error = null;
    this.iniciarFallbackDeLoading();
    this.vagaService.listarVagasDisponiveis().pipe(
      timeout(8000),
      finalize(() => {
        this.limparFallbackDeLoading();
        this.loading = false;
      })
    ).subscribe({
      next: (vagas) => {
        this.vagas = vagas;
      },
      error: (err) => {
        console.error('Erro ao filtrar vagas:', err);
        this.error = 'Nao foi possivel filtrar as vagas agora.';
      }
    });
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
        this.carregarVagas();
      },
      error: (err) => {
        console.error('Erro ao anunciar vaga:', err);
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
      alert('Faça login novamente para comprar a vaga.');
      return;
    }

    this.loading = true;
    this.vagaService.comprarVaga(id, usuario.id).subscribe({
      next: () => {
        alert('Processo de compra iniciado com sucesso.');
        this.carregarVagas();
      },
      error: (err) => {
        console.error(`Erro ao comprar vaga ${id}:`, err);
        alert(err.error?.message || err.error || 'Erro ao processar compra. Tente novamente.');
        this.loading = false;
      }
    });
  }

  getBotaoTexto(vaga: Vaga): string {
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
    return vaga.status === 'DISPONIVEL';
  }

  acaoBotao(vaga: Vaga): void {
    if (vaga.status === 'DISPONIVEL') {
      this.comprarVaga(vaga.id);
    }
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

  private iniciarFallbackDeLoading(): void {
    this.limparFallbackDeLoading();
    this.loadingFallbackId = setTimeout(() => {
      if (this.loading) {
        this.loading = false;
        this.error = 'A busca de vagas demorou mais do que o esperado. Verifique o back-end e a aba Network do navegador.';
      }
    }, 9000);
  }

  private limparFallbackDeLoading(): void {
    if (this.loadingFallbackId) {
      clearTimeout(this.loadingFallbackId);
      this.loadingFallbackId = null;
    }
  }
}
