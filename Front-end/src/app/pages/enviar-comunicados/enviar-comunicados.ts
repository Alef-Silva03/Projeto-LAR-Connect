// src/app/components/enviar-comunicados/enviar-comunicados.component.ts
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComunicadoService } from '../../services/comunicado.service';
import { Comunicado } from '../../models/comunicado.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-enviar-comunicados',
  standalone: true,
  imports: [CommonModule, FormsModule], // HttpClient não precisa ser importado aqui se fornecido globalmente
  templateUrl: './enviar-comunicados.html',
  styleUrls: ['./enviar-comunicados.css']
})

export class EnviarComunicados implements OnInit {
  comunicado: Comunicado = {
    tipo: '',
    titulo: '',
    texto: '',
    idCondominio: 0,
  };

  comunicados: Comunicado[] = [];

  constructor(
    private comunicadoService: ComunicadoService,
    private cdr: ChangeDetectorRef,
    public authService: AuthService,
  ) {}
  
  ngOnInit(): void {
    this.cdr.detectChanges();
    this.carregarComunicados();
    this.cdr.detectChanges();
  }

  enviarComunicado(): void {
    const usuarioString = localStorage.getItem('usuario');
    if (!usuarioString) {
      alert('Usuário não encontrado. Faça login novamente.');
      return;
    }
    const usuario = JSON.parse(usuarioString);

    this.comunicado.idCondominio = usuario.condominio?.id;
    this.comunicadoService.enviarComunicado(this.comunicado).subscribe({
      next: () => {
        alert('Comunicado postado com sucesso!');
        this.comunicado = { tipo: '', titulo: '', texto: '', idCondominio: this.comunicado.idCondominio }; // limpa formulário
        this.carregarComunicados(); // atualiza a lista
      },
      error: (err) => {
        console.error('Erro ao enviar comunicado', err);
        alert('Erro ao postar comunicado. Verifique o console.');
      }
    });
  }

  carregarComunicados(): void {
    this.comunicadoService.listarComunicados().subscribe({
      next: (lista) => {
        this.comunicados = lista;
        this.cdr.detectChanges();   // <-- força a atualização da view
      },
      error: (err) => console.error('Erro ao carregar comunicados', err)
    });
  }

  excluirComunicado(id: any) {
    if (confirm('Tem certeza de que deseja excluir este comunicado?')) {
      this.comunicadoService.excluirComunicado(id).subscribe({
        next: () => {
          this.comunicados = this.comunicados.filter(comunicado => comunicado.id !== id);
          this.cdr.detectChanges();
        },
        error: () => {
          alert('Erro no processo de exclusão');
        }
      });
    }
  }
}