import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CadastroService } from '../../services/cadastro.service'; // Você precisa criar este serviço
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {

  usuario = {
    nome: '',
    email: '', 
    senha: '',
    cpf: '',  
    telefone: '', 
    perfil: ''
  };

  constructor(
    private cadastroService: CadastroService,
    private router: Router,
    private authService: AuthService
  ) {}

  realizarCadastro() {
    console.log('Dados enviados:', this.usuario);
    
    this.cadastroService.cadastrar(this.usuario).subscribe({
      next: (res) => {
        if (localStorage.getItem('perfil') == 'SINDICO'){
          this.router.navigate(['/criar-condominio']);
        } else{
          alert('Cadastro realizado com sucesso!');
          this.router.navigate(['/login']);
        }
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