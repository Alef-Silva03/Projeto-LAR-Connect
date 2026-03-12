import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FuncionariosService, Funcionario } from '../../services/funcionarios';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-painel-funcionarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './painel-funcionarios.html',
  styleUrls: ['./painel-funcionarios.css']
})
export class PainelFuncionarios implements OnInit {
  funcionarios: Funcionario[] = [];
  formData = {
    emailFuncionario: '',
    cargoFuncionario: ''
  };

  constructor(
    private funcionariosService: FuncionariosService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {
    this.carregarFuncionarios();
  }

carregarFuncionarios(): void {
  this.funcionariosService.listarFuncionarios().subscribe({
    next: (data) => {
      this.funcionarios = data;
      this.cdr.detectChanges(); // força a atualização da view
    },
    error: (err) => console.error('Erro ao carregar funcionarios', err)
  });
}

  onSubmit(): void {
    const usuarioString = localStorage.getItem('usuario');
    if (!usuarioString) {
      alert('Usuário não encontrado. Faça login novamente.');
      return;
    }
    const usuario = JSON.parse(usuarioString);
    if (usuario.condominio == '') {
      alert('Usuário não autenticado ou sem condomínio vinculado.');
      return;
    }

    const { emailFuncionario, cargoFuncionario } = this.formData;
    if (!emailFuncionario || !cargoFuncionario) {
      alert('Preencha todos os campos.');
      return;
    }

    this.funcionariosService.adicionarFuncionario(
      emailFuncionario,
      cargoFuncionario,
      usuario.condominio?.id
    ).subscribe({
      next: () => {
        this.carregarFuncionarios(); // recarrega a tabela
        this.formData = { emailFuncionario: '', cargoFuncionario: '' }; // limpa o formulário
      },
      error: (err) => alert(err.error?.message || 'Erro ao adicionar funcionário.')
    });
    this.cdr.detectChanges(); // força a atualização da view
  }

    removerFuncionario(email: string) {
    if (confirm('Tem certeza de que deseja remover este funcionário?')) {
      this.funcionariosService.removerFuncionario(email).subscribe({
        next: () => {
          this.funcionarios = this.funcionarios.filter(funcionario => funcionario.email !== email);
          this.cdr.detectChanges();
        },
        error: () => {
          alert('Erro no processo de exclusão');
        }
      });
    }
  }
}