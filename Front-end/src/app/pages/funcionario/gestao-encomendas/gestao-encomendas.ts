import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { gestaoEncomendasService } from '../../../services/gestao-encomendas';

@Component({
  selector: 'app-gestao-encomendas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './gestao-encomendas.html',
  styleUrls: ['./gestao-encomendas.css']
})
export class GestaoEncomendas {
  novaEntrega = {
    dataChegada: new Date(),
    morador: '',
    descricao: '',
  };

  encomendasPendentes: any[] = [];

   constructor(
    private gestaoEncomendasService: gestaoEncomendasService,
    private cdr: ChangeDetectorRef
  ) { }

  atualizarLista() {
    this.gestaoEncomendasService.listarEncomendas().subscribe({
      next: (dados: any[]) => {
        this.encomendasPendentes = dados;
        this.cdr.detectChanges(); // Força a detecção de mudanças
      },
      error: (err) => console.error("Erro ao buscar encomendas", err)
    });
  }

  ngOnInit() {
    this.atualizarLista();
  }

  salvarEncomenda() {
    if (this.novaEntrega.descricao && this.novaEntrega.morador) {
        this.novaEntrega.dataChegada = new Date();
      this.gestaoEncomendasService.registrarEncomenda(this.novaEntrega).subscribe({
        next: () => {
          alert(`O morador ${this.novaEntrega.morador} foi notificado!`);
          this.novaEntrega = { morador: '', descricao: '', dataChegada: new Date() }; // Limpa o formulário
          this.atualizarLista(); // Recarrega a prateleira
        },
        error: () => alert("Erro ao salvar. Verifique se o morador está cadastrado.")
      });
    } else {
      alert("Preencha o Nome do Morador e a Descrição!");
    }
  }

  marcarComoEntregue(item: any) {
    this.gestaoEncomendasService.finalizarEntrega(item.id).subscribe({
      next: () => {
        alert('Entrega finalizada! O pacote saiu da prateleira.');
        this.atualizarLista(); // O item sumirá da lista pois 'entregue' agora é true
      },
      error: (err) => console.error("Erro ao finalizar entrega", err)
    });
  }
}