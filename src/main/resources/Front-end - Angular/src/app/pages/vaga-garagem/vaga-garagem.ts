import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vaga-garagem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vaga-garagem.html',
  styleUrl: './vaga-garagem.css',
})
export class vagagaragem  {
  vagas = [
    { id: 1, proprietario: 'Alef Silva', numero: 'A1', status: 'Ocupada', statusClass: 'status-ocupada', disponivel: false },
    { id: 2, proprietario: '', numero: 'A2', status: 'Disponível', statusClass: 'status-disponivel', disponivel: true },
    { id: 3, proprietario: '', numero: 'A3', status: 'Disponível', statusClass: 'status-disponivel', disponivel: true },
    { id: 4, proprietario: 'Patrícia', numero: 'B1', status: 'À Venda', statusClass: 'status-venda', disponivel: true },
    { id: 5, proprietario: 'João', numero: 'B2', status: 'Ocupada', statusClass: 'status-ocupada', disponivel: false }
  ];

  constructor() {}

  ngOnInit(): void {}

  comprarVaga(id: number) {
    console.log(`Iniciando processo de compra para a vaga ${id}`);
    // Futura integração com o Service Java
  }
}