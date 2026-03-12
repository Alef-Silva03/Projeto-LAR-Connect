import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GestaoEncomendasService } from '../../../services/gestao-encomendas';

@Component({
  selector: 'app-gestao-encomendas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './gestao-encomendas.html',
  styleUrls: ['./gestao-encomendas.css']
})
export class LocalGestaoEncomendasComponent implements OnInit {
  // Ajustado para 'moradorNome' para bater com o DTO do Java
  novaEntrega = {
    apartamento: '',
    bloco: '',
    moradorNome: '', // Antes era 'morador'
    descricao: 'Pacote/Correspondência'
  };

  encomendasPendentes: any[] = [];

  constructor(private gestaoEncomendasService: GestaoEncomendasService) { }

  ngOnInit() {
    this.atualizarLista();
  }

  atualizarLista() {
    this.gestaoEncomendasService.listarEncomendas()
    /*.subscribe({
      next: (dados: any[]) => this.encomendasPendentes = dados,
      error: (err: any) => console.error("Erro ao buscar encomendas", err)
    });*/
  }

  salvarEncomenda() {
    // Verificação atualizada para moradorNome
    if (this.novaEntrega.apartamento && this.novaEntrega.moradorNome) {
      this.gestaoEncomendasService.registrarEncomenda(this.novaEntrega)
      /*.subscribe({
        next: () => {
          alert(`Morador do apartamento ${this.novaEntrega.apartamento} foi notificado!`);
          // Limpa o formulário resetando para o novo nome do campo
          this.novaEntrega = { apartamento: '', bloco: '', moradorNome: '', descricao: 'Pacote/Correspondência' };
          this.atualizarLista();
        },
        error: () => alert("Erro ao salvar encomenda no banco. Verifique o console do Java.")
      });*/
    } else {
      alert("Preencha o Nome do Morador e o Apartamento!");
    }
  }

  marcarComoEntregue(item: any) {
    this.gestaoEncomendasService.finalizarEntrega(item.id)
    /*.subscribe({
      next: () => {
        alert('Entrega finalizada com sucesso!');
        this.atualizarLista();
      }
    });*/
  }
}