import { Component, OnInit } from '@angular/core'; // Correção do pacote
import { CommonModule } from '@angular/common'; // Mantenha este se usar *ngIf ou *ngFor

@Component({
  selector: 'app-notificacoes',
  standalone: true, // Importante se for standalone
  imports: [CommonModule],
  templateUrl: './notificacoes.html',
  styleUrls: ['./notificacoes.css']
})

export class Notificacoes implements OnInit {
  abaAtiva: string = 'entregas'; // Controle da aba
  perfilUsuario: string = 'INQUILINO'; // Simulação de perfil
  
  encomendas = [
    { id: 1, descricao: 'Pacote Amazon - Portaria A', hora: '14:30', status: 'pendente' },
    { id: 2, descricao: 'Mercado Livre - Volume 02', hora: '16:45', status: 'pendente' }
  ];

  historico = [
    { id: 101, descricao: 'Encomenda iFood', data: '15/02/2026', entreguePor: 'João (Porteiro)' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Aqui você buscaria os dados reais do seu Back-end Java
  }

  setAba(nomeAba: string) {
    this.abaAtiva = nomeAba;
  }

  confirmarRecebimento(id: number) {
    console.log(`Confirmando recebimento do item ${id}`);
    // Lógica para chamar seu serviço Java e atualizar o banco MySQL
  }
}