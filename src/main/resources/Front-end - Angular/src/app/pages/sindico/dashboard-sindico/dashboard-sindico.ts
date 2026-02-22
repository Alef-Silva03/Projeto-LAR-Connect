import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface AcaoCard {
  titulo: string;
  icone: string;
  rota: string;
  destaque?: boolean;
}

@Component({
  selector: 'app-dashboard-sindico',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-sindico.html',
  styleUrls: ['./dashboard-sindico.css']
})
export class DashboardSindico implements OnInit {
  // Nome que será exibido no header
  nomeSindico: string = 'Alef Silva'; 

  // Lista de todas as 11 funcionalidades conforme a referência
  acoesSindico: AcaoCard[] = [
    { titulo: 'Minha Conta', icone: 'bi-person-fill', rota: '/minha-conta' },
    { titulo: 'Mensagens e Pedidos', icone: 'bi-envelope-fill', rota: '/caixa-entrada' },
    { titulo: 'Enviar Mensagens e Docs', icone: 'bi-file-earmark-medical-fill', rota: '/enviar-mensagens' },
    { titulo: 'Criar Enquete ou Votação', icone: 'bi-ui-checks', rota: '/enquete-votacao' },
    { titulo: 'Chat', icone: 'bi-chat-dots-fill', rota: '/chat' },
    { titulo: 'Postar Comunicado', icone: 'bi-megaphone-fill', rota: '/enviar-comunicados' },
    { titulo: 'Correspondências e Entregas', icone: 'bi-box-seam-fill', rota: '/notificacoes-entrega' },
    { titulo: 'Anúncios de Venda e Aluguel', icone: 'bi-house-door-fill', rota: '/anuncios-imoveis' },
    { titulo: 'Vagas de Estacionamento', icone: 'bi-car-front-fill', rota: '/vaga-garagem' },
    { titulo: 'Reservar Espaços e Pedidos', icone: 'bi-calendar-check-fill', rota: '/reserva-espacos' },
    { titulo: 'Adicionar ou Remover Membros', icone: 'bi-person-plus-fill', rota: '/painel-moradores', destaque: true }
  ];

  constructor() {}

  ngOnInit(): void {
    // Aqui você poderá buscar o nome real do usuário no localStorage ou via Service futuramente
    const usuarioLogado = localStorage.getItem('usuario');
    if (usuarioLogado) {
      this.nomeSindico = JSON.parse(usuarioLogado).nome;
    }
  }
}