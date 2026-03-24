import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MoradoresService, Morador } from '../../services/moradores';
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
  moradores: Morador[] = [];
  console = console;
  formData = {
    emailMorador: '',
    apartamentoMorador: '',
    blocoMorador: '',
    vagaMorador: '',
  };

  constructor(
    private moradoresService: MoradoresService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarMoradores();
  }

  carregarMoradores(): void {
    this.moradoresService.listarMoradores().subscribe({
      next: (data) => {
        this.moradores = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erro ao carregar moradores', err)
    });
  }

  onSubmit(): void {
    const usuarioString = localStorage.getItem('usuario');
    if (!usuarioString) {
      alert('Usuario nao encontrado. Faca login novamente.');
      return;
    }

    const usuario = JSON.parse(usuarioString);
    if (!usuario.condominio?.id) {
      alert('Usuario nao autenticado ou sem condominio vinculado.');
      return;
    }

    const { emailMorador, apartamentoMorador, blocoMorador, vagaMorador } = this.formData;
    if (!emailMorador || !apartamentoMorador) {
      alert('Preencha todos os campos obrigatorios.');
      return;
    }

    this.moradoresService.adicionarMorador(
      emailMorador,
      apartamentoMorador,
      blocoMorador,
      vagaMorador,
      usuario.condominio.id
    ).subscribe({
      next: () => {
        this.carregarMoradores();
        this.formData = { emailMorador: '', apartamentoMorador: '', blocoMorador: '', vagaMorador: '' };
        alert('Morador vinculado com sucesso.');
        this.cdr.detectChanges();
      },
      error: (err) => {
        const mensagem =
          err.error?.message ||
          err.error ||
          'Erro ao adicionar morador. Verifique se ele ja fez o cadastro na plataforma com este e-mail.';
        alert(mensagem);
      }
    });
  }

  removerMorador(email: string) {
    if (confirm('Tem certeza de que deseja remover este morador?')) {
      this.moradoresService.removerMorador(email).subscribe({
        next: () => {
          this.moradores = this.moradores.filter(morador => morador.email !== email);
          this.cdr.detectChanges();
        },
        error: () => {
          alert('Erro no processo de exclusao');
        }
      });
    }
  }
}
