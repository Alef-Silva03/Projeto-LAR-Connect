import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reserva-espacos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reserva-espacos.html',
  styleUrls: ['./reserva-espacos.css']
})
export class ReservaEspacos {
  dataSelecionada: string = '';
  
  // Lista de espaços com ícones temáticos
  espacos = [
    { nome: 'Churrasqueira Gourmet', icone: 'bi-fire', disponivel: true },
    { nome: 'Salão de Festas', icone: 'bi-music-note-beamed', disponivel: false },
    { nome: 'Playground Kids', icone: 'bi-person-arms-up', disponivel: true },
    { nome: 'Academia', icone: 'bi-hypnotize', disponivel: true },
    { nome: 'Quadra Esportiva', icone: 'bi-dribbble', disponivel: true },
    { nome: 'Espaço Cinema', icone: 'bi-film', disponivel: false }
  ];

  verificarDisponibilidade() {
    console.log('Verificando reservas para:', this.dataSelecionada);
    // Lógica futura: consultar o banco Java/Spring Boot
    // Por enquanto, apenas inverte alguns status para simulação visual
    this.espacos.forEach(e => e.disponivel = Math.random() > 0.5);
  }
}