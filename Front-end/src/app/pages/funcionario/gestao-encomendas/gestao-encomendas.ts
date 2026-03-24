import { Component, OnInit } from '@angular/core';
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
export class GestaoEncomendas implements OnInit {
  novaEntrega = {
    moradorNome: '',
    descricao: '',
  };

  encomendasPendentes: any[] = [];

  constructor(private gestaoEncomendasService: gestaoEncomendasService) { }

  ngOnInit() {
    this.atualizarLista();
  }

  atualizarLista() {
    this.gestaoEncomendasService.listarEncomendas().subscribe({
      next: (dados: any[]) => this.encomendasPendentes = dados,
      error: (err) => console.error("Erro ao buscar encomendas", err)
    });
  }

  salvarEncomenda() {
    if (this.novaEntrega.descricao && this.novaEntrega.moradorNome) {
      this.gestaoEncomendasService.registrarEncomenda(this.novaEntrega).subscribe({
        next: () => {
          alert(`O morador ${this.novaEntrega.moradorNome} foi notificado!`);
          this.novaEntrega = { moradorNome: '', descricao: '' };
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