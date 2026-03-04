import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { VagaService } from '../../services/vaga.service';
import { Vaga } from '../../models/vaga.model';

@Component({
  selector: 'app-vaga-garagem',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [VagaService],
  templateUrl: './vaga-garagem.html',
  styleUrl: './vaga-garagem.css',
})
export class VagaGaragem implements OnInit {
  vagas: Vaga[] = [];
  filtroAtivo: string = 'Todas';
  loading: boolean = false;
  error: string | null = null;

  // Mapeamento de status para exibição
  statusMap: { [key: string]: { text: string; class: string } } = {
    'disponivel': { text: 'DISPONÍVEL', class: 'disponivel' },
    'reservada': { text: 'RESERVADA', class: 'reservada' },
    'vendida': { text: 'VENDIDA', class: 'vendida' },
    'indisponivel': { text: 'INDISPONÍVEL', class: 'indisponivel' }
  };

  constructor(private vagaService: VagaService) {}

  ngOnInit(): void {
    this.carregarVagas();
  }

  carregarVagas(): void {
    this.loading = true;
    this.error = null;
    
    this.vagaService.listarVagas().subscribe({
      next: (response) => {
        if (response && response.content) {
          this.vagas = response.content.map(vaga => ({
            ...vaga,
            disponivel: vaga.status === 'disponivel' // Atualiza disponível baseado no status
          }));
        } else {
          this.vagas = (response as any).map((vaga: any) => ({
            ...vaga,
            disponivel: vaga.status === 'disponivel'
          }));
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar vagas:', err);
        this.error = 'Erro ao carregar vagas. Tente novamente.';
        this.loading = false;
        
        // Fallback para dados locais em caso de erro
        this.carregarVagasFallback();
      }
    });
  }

  carregarVagasFallback(): void {
    // Dados de exemplo com os novos status
    this.vagas = [
      { 
        id: 1, 
        proprietario: 'Alef Silva', 
        numero: 'A1', 
        localizacao: 'A-01',
        valor: 25000,
        status: 'vendida', 
        disponivel: false 
      },
      { 
        id: 2, 
        proprietario: '', 
        numero: 'A2', 
        localizacao: 'A-02',
        valor: 27000,
        status: 'disponivel', 
        disponivel: true 
      },
      { 
        id: 3, 
        proprietario: 'Carlos', 
        numero: 'A3', 
        localizacao: 'A-03',
        valor: 32000,
        status: 'reservada', 
        disponivel: false 
      },
      { 
        id: 4, 
        proprietario: '', 
        numero: 'B1', 
        localizacao: 'B-01',
        valor: 35000,
        status: 'disponivel', 
        disponivel: true 
      },
      { 
        id: 5, 
        proprietario: 'João', 
        numero: 'B2', 
        localizacao: 'B-02',
        valor: 28000,
        status: 'indisponivel', 
        disponivel: false 
      },
      { 
        id: 6, 
        proprietario: '', 
        numero: 'C1', 
        localizacao: 'C-01',
        valor: 45000,
        status: 'disponivel', 
        disponivel: true 
      }
    ];
  }

  filtrarVagas(tipo: string): void {
    this.filtroAtivo = tipo;
    
    if (tipo === 'Todas') {
      this.carregarVagas();
      return;
    }
    
    // Para "Disponíveis para Venda" - filtra apenas disponíveis
    this.loading = true;
    this.vagaService.listarVagasDisponiveis().subscribe({
      next: (vagas) => {
        this.vagas = vagas.map(vaga => ({
          ...vaga,
          disponivel: vaga.status === 'disponivel'
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao filtrar vagas:', err);
        // Fallback: filtrar localmente
        this.vagas = this.vagas.filter(v => v.status === 'disponivel');
        this.loading = false;
      }
    });
  }

  comprarVaga(id: number): void {
    // Verifica se a vaga ainda está disponível antes de comprar
    const vaga = this.vagas.find(v => v.id === id);
    if (!vaga || vaga.status !== 'disponivel') {
      alert('Esta vaga não está mais disponível para compra.');
      this.carregarVagas(); // Recarrega para atualizar
      return;
    }

    this.loading = true;
    this.vagaService.comprarVaga(id).subscribe({
      next: (response) => {
        console.log(`Compra iniciada para vaga ${id}`, response);
        alert('Processo de compra iniciado com sucesso! Entraremos em contato.');
        this.carregarVagas(); // Recarrega a lista
        this.loading = false;
      },
      error: (err) => {
        console.error(`Erro ao comprar vaga ${id}:`, err);
        alert('Erro ao processar compra. Tente novamente.');
        this.loading = false;
      }
    });
  }

  reservarVaga(id: number): void {
    const vaga = this.vagas.find(v => v.id === id);
    if (!vaga || vaga.status !== 'disponivel') {
      alert('Esta vaga não está disponível para reserva.');
      return;
    }

    this.loading = true;
    this.vagaService.reservarVaga(id).subscribe({
      next: (response) => {
        console.log(`Vaga ${id} reservada com sucesso`, response);
        alert('Vaga reservada com sucesso! Você tem 24h para finalizar a compra.');
        this.carregarVagas();
        this.loading = false;
      },
      error: (err) => {
        console.error(`Erro ao reservar vaga ${id}:`, err);
        alert('Erro ao reservar vaga. Tente novamente.');
        this.loading = false;
      }
    });
  }

  getStatusInfo(status: string): { text: string; class: string } {
    return this.statusMap[status] || { text: status.toUpperCase(), class: 'indisponivel' };
  }

  getBotaoTexto(vaga: Vaga): string {
    switch(vaga.status) {
      case 'disponivel':
        return 'COMPRAR';
      case 'reservada':
        return 'RESERVADA';
      case 'vendida':
        return 'VENDIDA';
      case 'indisponivel':
        return 'INDISPONÍVEL';
      default:
        return 'INDISPONÍVEL';
    }
  }

  isBotaoHabilitado(vaga: Vaga): boolean {
    return vaga.status === 'disponivel';
  }

  acaoBotao(vaga: Vaga): void {
    if (vaga.status === 'disponivel') {
      this.comprarVaga(vaga.id);
    }
    // Para outros status, o botão está desabilitado
  }

  formatarValor(vaga: Vaga): string {
    return `R$ ${vaga.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  getStatusClass(status: string): string {
    return this.statusMap[status]?.class || 'indisponivel';
  }

  getStatusText(status: string): string {
    return this.statusMap[status]?.text || status.toUpperCase();
  }
}