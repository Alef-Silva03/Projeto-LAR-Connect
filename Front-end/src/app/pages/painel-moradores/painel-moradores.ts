import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MoradoresService, Morador } from '../../services/moradores';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-painel-moradores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './painel-moradores.html',
  styleUrls: ['./painel-moradores.css']
})

export class PainelMoradores implements OnInit {
  moradores: Morador[] = []
  console = console
  formData = {
    emailMorador: '',
    apartamentoMorador: '',
    blocoMorador: '',
    vagaMorador: '',
  };

  constructor(
    private moradoresService: MoradoresService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {
    this.carregarMoradores();
  }

  carregarMoradores(): void {
    this.moradoresService.listarMoradores().subscribe({
      next: (data) => {
        this.moradores = data;
        this.cdr.detectChanges(); // força a atualização da view
      },
      error: (err) => console.error('Erro ao carregar moradores', err)
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
    const { emailMorador, apartamentoMorador, blocoMorador, vagaMorador } = this.formData;
    if (!emailMorador || !apartamentoMorador) {
      alert('Preencha todos os campos.');
      return;
    }
    this.moradoresService.adicionarMorador(
      emailMorador,
      apartamentoMorador,
      blocoMorador,
      vagaMorador,
      usuario.condominio?.id
    ).subscribe({
      next: () => {
        this.carregarMoradores(); // recarrega a tabela
        this.formData = { emailMorador: '', apartamentoMorador: '', blocoMorador: '', vagaMorador: '' }; // limpa o formulário
      },
      error: (err) => alert(err.error?.message || 'Erro ao adicionar morador.')
    });
    alert("Morador adicionado com sucesso!")
    this.cdr.detectChanges(); // força a atualização da view
  }

  removerMorador(email: string) {
    if (confirm('Tem certeza de que deseja remover este morador?')) {
      this.moradoresService.removerMorador(email).subscribe({
        next: () => {
          this.moradores = this.moradores.filter(morador => morador.email !== email);
          this.cdr.detectChanges();
        },
        error: () => {
          alert('Erro no processo de exclusão');
        }
      });
    }
  }
}