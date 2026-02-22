import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // 1. Importe o CommonModule
import { RouterModule } from '@angular/router'; // Importe para o routerLink funcionar

@Component({
  selector: 'app-dashboard-funcionario',
  standalone: true, // Garante que é standalone
  imports: [CommonModule, RouterModule], // 2. Adicione aqui os módulos importados
  templateUrl: './dashboard-funcionario.html',
  styleUrls: ['./dashboard-funcionario.css']
})
export class DashboardFuncionario implements OnInit {
  nomeFuncionario = 'Marcos Oliveira';
  encomendasPendentes = 12;
  horaAtual: string = '';

  acessosRecentes = [
    { hora: '10:45', nome: 'João Silva (Uber)', tipo: 'Visitante', unidade: 'Apto 402-A', status: 'Entrada' },
    { hora: '10:30', nome: 'Loggi Entregas', tipo: 'Prestador', unidade: 'Portaria', status: 'Saída' },
    { hora: '10:15', nome: 'Ricardo M. (Técnico Vivo)', tipo: 'Prestador', unidade: 'Apto 101-B', status: 'Entrada' }
  ];

  ngOnInit() {
    this.atualizarRelogio();
  }

  atualizarRelogio() {
    setInterval(() => {
      const now = new Date();
      this.horaAtual = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }, 1000);
  }

  abrirModalAcesso(tipo: string) {
    console.log(`Abrindo formulário para: ${tipo}`);
  }
}