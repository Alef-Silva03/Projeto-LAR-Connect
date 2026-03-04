import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dados-condominio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dados-condominio.html',
  styleUrl: './dados-condominio.css',
})
export class DadosCondominio {
  dadosUsuario = {
    apartamento: localStorage.getItem('apartamento'),
    bloco: localStorage.getItem('bloco') || 'A',
    vaga: localStorage.getItem('vaga') || '05',
    telefone: localStorage.getItem('telefone') || '',
    ultimaAlteracaoSenha: localStorage.getItem('ultimaAlteracaoSenha') || '',
  };


  dadosCondominio() {
    const usuarioString = localStorage.getItem('usuario')

    if (!usuarioString) {
      alert('Usuário não encontrado. Faça login novamente.');
      return;
    }
    const usuario = JSON.parse(usuarioString)
    const condominio = usuario.condominio
    console.log(condominio)
    return condominio
  }



  // Dados de boletos
  boletos: any[] = [];

  // Dados de notificações
  notificacoes: any[] = [];
  filtroNotificacoes: string = 'todas';
  notificacoesFiltradas: any[] = [];

  constructor(private router: Router) {}

  // ===== MÉTODOS GERAIS =====

  getApartamento() {
    return localStorage.getItem('apartamento');
  }

  getBloco() {
    return localStorage.getItem('bloco');
  }

  getVaga() {
    return localStorage.getItem('vaga');
  }

  logout() {
    // Limpar dados de sessão se necessário
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  // ===== MÉTODOS DE EDIÇÃO =====
  editarCampo(campo: string) {
    switch(campo) {
        
      case 'telefone':
        const novoTelefone = prompt('Digite seu novo telefone:', this.dadosUsuario.telefone);
        if (novoTelefone && novoTelefone.trim()) {
          this.dadosUsuario.telefone = novoTelefone;
          localStorage.setItem('telefone', novoTelefone);
        }
        break;
    }
  }

  validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
}