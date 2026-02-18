import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-painel-moradores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './painel-moradores.html',
  styleUrls: ['./painel-moradores.css']
})
export class PainelMoradores implements OnInit {
  // Dados iniciais baseados na sua referência
  moradores: any[] = [
    { nome: 'Alef Silva', apto: '1320', bloco: 'A', status: 'Ativo' },
    { nome: 'Yuri', apto: '1321', bloco: 'A', status: 'Ativo' },
    { nome: 'Pedro', apto: '402', bloco: 'B', status: 'Inativo' },
    { nome: 'Patricia Stampa', apto: '402', bloco: 'C', status: 'Ativo' },
    { nome: 'João', apto: '101', bloco: 'A', status: 'Ativo' }
  ];

  moradoresFiltrados = [...this.moradores];

  ngOnInit(): void {}

  filtrar(valor: string) {
    const termo = valor.toLowerCase();
    this.moradoresFiltrados = this.moradores.filter(m => 
      m.nome.toLowerCase().includes(termo) || m.apto.includes(termo)
    );
  }
}