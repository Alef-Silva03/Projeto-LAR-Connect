import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gestao-encomendas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './gestao-encomendas.html',
  styleUrls: ['./gestao-encomendas.css']
})
export class GestaoEncomendas {
  novaEntrega = { apto: '', bloco: '', morador: '' };
  
  encomendasPendentes = [
    { id: 1, morador: 'Ana Souza', apto: '102', bloco: 'A', dataChegada: 'Hoje, 09:30' },
    { id: 2, morador: 'Bruno Alves', apto: '504', bloco: 'C', dataChegada: 'Hoje, 11:15' }
  ];

  salvarEncomenda() {
    if (this.novaEntrega.apto && this.novaEntrega.morador) {
      const data = new Date();
      const horario = `${data.getHours()}:${data.getMinutes().toString().padStart(2, '0')}`;
      
      this.encomendasPendentes.unshift({
        id: Date.now(),
        morador: this.novaEntrega.morador,
        apto: this.novaEntrega.apto,
        bloco: this.novaEntrega.bloco,
        dataChegada: `Hoje, ${horario}`
      });

      alert(`Morador do apto ${this.novaEntrega.apto} foi notificado via App!`);
      this.novaEntrega = { apto: '', bloco: '', morador: '' };
    }
  }

  marcarComoEntregue(item: any) {
    this.encomendasPendentes = this.encomendasPendentes.filter(e => e.id !== item.id);
    alert('Entrega finalizada com sucesso!');
  }
}