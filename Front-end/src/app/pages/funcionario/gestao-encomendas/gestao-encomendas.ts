import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-gestao-encomendas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './gestao-encomendas.html',
  styleUrls: ['./gestao-encomendas.css']
})
export class GestaoEncomendas implements OnInit {
  novaEntrega = {
    apto: '',
    bloco: '',
    moradorNome: '', 
    descricao: 'Pacote/Correspondência'
  };

  encomendasPendentes: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.atualizarLista();
  }

  atualizarLista() {
    this.authService.listarEncomendas().subscribe({
      next: (dados: any[]) => this.encomendasPendentes = dados,
      error: (err) => console.error("Erro ao buscar encomendas", err)
    });
  }

  salvarEncomenda() {
    if (this.novaEntrega.apto && this.novaEntrega.moradorNome) {
      this.authService.registrarEncomenda(this.novaEntrega).subscribe({
        next: () => {
          alert(`Morador do apto ${this.novaEntrega.apto} foi notificado!`);
          this.novaEntrega = { apto: '', bloco: '', moradorNome: '', descricao: 'Pacote/Correspondência' };
          this.atualizarLista(); // Recarrega a prateleira
        },
        error: () => alert("Erro ao salvar. Verifique se o morador está cadastrado com este apto/bloco.")
      });
    } else {
      alert("Preencha o Nome do Morador e o Apartamento!");
    }
  }

  marcarComoEntregue(item: any) {
    this.authService.finalizarEntrega(item.id).subscribe({
      next: () => {
        alert('Entrega finalizada! O pacote saiu da prateleira.');
        this.atualizarLista(); // O item sumirá da lista pois 'entregue' agora é true
      },
      error: (err) => console.error("Erro ao finalizar entrega", err)
    });
  }
}