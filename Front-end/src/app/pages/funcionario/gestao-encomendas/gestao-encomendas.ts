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
    apartamento: '',
    bloco: '',
    moradorNome: '', 
    descricao: 'Pacote/Correspondência'
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
    if (this.novaEntrega.apartamento && this.novaEntrega.moradorNome) {
      this.gestaoEncomendasService.registrarEncomenda(this.novaEntrega).subscribe({
        next: () => {
          alert(`Morador do apto ${this.novaEntrega.apartamento} foi notificado!`);
          this.novaEntrega = { apartamento: '', bloco: '', moradorNome: '', descricao: 'Pacote/Correspondência' };
          this.atualizarLista(); // Recarrega a prateleira
        },
        error: () => alert("Erro ao salvar. Verifique se o morador está cadastrado com este apartamento/bloco.")
      });
    } else {
      alert("Preencha o Nome do Morador e o Apartamento!");
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