import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importação obrigatória
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './../../services/auth';   // O serviço que criamos antes

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // Adicione o FormsModule aqui
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  // Objeto que reflete os campos do formulário
  usuario = {
    nome: '',
    login: '', // O backend espera 'login' (que é o email)
    senha: '',
    perfil: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  realizarCadastro() {
    console.log('Dados enviados:', this.usuario);
    this.authService.cadastrar(this.usuario).subscribe({
      next: (res) => {
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao cadastrar. Verifique os dados.');
      }
    });
  }
}