import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-gestao-encomendas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './gestao-encomendas.html',
  styleUrls: ['./gestao-encomendas.css']
})
export class GestaoEncomendas implements OnInit {
  // Ajustado para 'moradorNome' para bater com o DTO do Java
  novaEntrega = {
    apto: '',
    bloco: '',
    moradorNome: '', // Antes era 'morador'
    descricao: 'Pacote/Correspondência'
  };

  encomendasPendentes: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.atualizarLista();
  }

  atualizarLista() {
    this.authService.listarEncomendas()
    /*.subscribe({
      next: (dados: any[]) => this.encomendasPendentes = dados,
      error: (err: any) => console.error("Erro ao buscar encomendas", err)
    });*/
  }

  salvarEncomenda() {
    // Verificação atualizada para moradorNome
    if (this.novaEntrega.apto && this.novaEntrega.moradorNome) {
      this.authService.registrarEncomenda(this.novaEntrega)
      /*.subscribe({
        next: () => {
          alert(`Morador do apto ${this.novaEntrega.apto} foi notificado!`);
          // Limpa o formulário resetando para o novo nome do campo
          this.novaEntrega = { apto: '', bloco: '', moradorNome: '', descricao: 'Pacote/Correspondência' };
          this.atualizarLista();
        },
        error: () => alert("Erro ao salvar encomenda no banco. Verifique o console do Java.")
      });*/
    } else {
      alert("Preencha o Nome do Morador e o Apartamento!");
    }
  }

  marcarComoEntregue(item: any) {
    this.authService.finalizarEntrega(item.id)
    /*.subscribe({
      next: () => {
        alert('Entrega finalizada com sucesso!');
        this.atualizarLista();
      }
    });*/
  }
}