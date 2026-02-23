import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CadastroService } from '../../services/cadastro.service'; // Você precisa criar este serviço

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  // Interface CORRETA com todos os campos do formulário
  usuario = {
    nome: '',
    email: '',    // ← Mudado de 'login' para 'email'
    senha: '',
    cpf: '',      // ← Novo campo
    telefone: '', // ← Novo campo
    perfil: ''
  };

  constructor(
    private cadastroService: CadastroService,
    private router: Router
  ) {}

  realizarCadastro() {
    console.log('Dados enviados:', this.usuario);
    
    this.cadastroService.cadastrar(this.usuario).subscribe({
      next: (res) => {
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erro completo:', err);
        
        if (err.status === 409) {
          alert('Este email já está cadastrado!');
        } else if (err.status === 400) {
          alert('Dados inválidos. Verifique todos os campos.');
        } else {
          alert('Erro ao cadastrar. Tente novamente mais tarde.');
        }
      }
    });
  }
}