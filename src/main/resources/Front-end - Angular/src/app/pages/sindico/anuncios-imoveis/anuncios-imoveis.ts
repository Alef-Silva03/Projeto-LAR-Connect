import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-anuncios-imoveis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './anuncios-imoveis.html',
  styleUrls: ['./anuncios-imoveis.css']
})
export class AnunciosImoveis {
  filtro: string = 'todos';

  imoveis = [
    { 
      titulo: 'Cobertura Duplex Garden', 
      tipo: 'venda', 
      preco: 'R$ 1.250.000', 
      quartos: 4, area: 180, vagas: 3, 
      imagem: 'assets/imagem/apto1.jpg' 
    },
    { 
      titulo: 'Apartamento Vista Mar', 
      tipo: 'aluguel', 
      preco: 'R$ 4.500 /mês', 
      quartos: 2, area: 75, vagas: 1, 
      imagem: 'assets/imagem/apto2.jpg' 
    },
    { 
      titulo: 'Studio Moderno Mobiliado', 
      tipo: 'aluguel', 
      preco: 'R$ 2.800 /mês', 
      quartos: 1, area: 45, vagas: 1, 
      imagem: 'assets/imagem/apto3.jpg' 
    }
  ];

  get imoveisFiltrados() {
    if (this.filtro === 'todos') return this.imoveis;
    return this.imoveis.filter(i => i.tipo === this.filtro);
  }

  filtrar(tipo: string) {
    this.filtro = tipo;
  }
}