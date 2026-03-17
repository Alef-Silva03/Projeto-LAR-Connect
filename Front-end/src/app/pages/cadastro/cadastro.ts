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

  aplicarMascaraTelefone(event: any): void {
    let input = event.target;
    let value = input.value;
    
    // Remove tudo que não é número
    value = value.replace(/\D/g, '');
    
    // Limita o tamanho máximo (11 dígitos para celular com DDD)
    if (value.length > 12) value = value.slice(0, 12);
    
    // Aplica a máscara (XX) XXXXX-XXXX
    if (value.length > 2) {
      value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 12)}`;
    } else if (value.length > 0) {
      value = `(${value.substring(0, 2)}`;
    }
    input.value = value;
  }

  aplicarMascaraCPF(event: any): void {
    let input = event.target;
    let value = input.value;
    
    // Remove tudo que não é número
    value = value.replace(/\D/g, '');
    
    // Limita o tamanho máximo (11 dígitos para celular com DDD)
    if (value.length > 11) value = value.slice(0, 11);
    
    // Aplica a máscara (XX) XXXXX-XXXX
    if (value.length > 3) {
      value = `${value.substring(0, 3)}. ${value.substring(3, 6)}.${value.substring(6, 9)}-${value.substring(9, 11)}`;
    }
    input.value = value;
  }

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