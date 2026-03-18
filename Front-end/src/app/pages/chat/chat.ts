import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MensagemResponse, MensagemRequest } from '../../models/mensagem.model';
import { Subscription } from 'rxjs';
import { MensagemService } from '../../services/chat-service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css']
})
export class Chat implements OnInit {
  mensagem: MensagemRequest = {
    texto: '',
    idCondominio: 0,
    idUsuario: 0
  };

  mensagens: MensagemResponse[] = [];

  constructor(
    private mensagemService: MensagemService,
    private cdr: ChangeDetectorRef,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.carregarMensagens();
    this.cdr.detectChanges();
  }

  enviarMensagem(): void {
    const usuarioString = localStorage.getItem('usuario');
    if (!usuarioString) {
      alert('Usuário não encontrado. Faça login novamente.');
      return;
    }
    const usuario = JSON.parse(usuarioString);

    this.mensagem.idCondominio = usuario.condominio?.id;
    this.mensagemService.enviarMensagem(this.mensagem).subscribe({
      next: () => {
        this.mensagem = { texto: '', idCondominio: this.mensagem.idCondominio, idUsuario: this.mensagem.idUsuario }; // limpa formulário
        this.carregarMensagens(); // atualiza a lista
      },
      error: (err) => {
        console.error('Erro ao enviar mensagem', err);
        alert('Erro ao postar mensagem. Verifique o console.');
      }
    });
  }

  carregarMensagens(): void {
    this.mensagemService.listarMensagens().subscribe({
      next: (lista) => {
        this.mensagens = lista;
        this.cdr.detectChanges();   // <-- força a atualização da view
      },
      error: (err) => console.error('Erro ao carregar mensagens', err)
    });
  }

  excluirMensagem(id: any) {
    if (confirm('Tem certeza de que deseja excluir este mensagem?')) {
      this.mensagemService.excluirMensagem(id).subscribe({
        next: () => {
          this.mensagens = this.mensagens.filter(mensagem => mensagem.id !== id);
          this.cdr.detectChanges();
        },
        error: () => {
          alert('Erro no processo de exclusão');
        }
      });
    }
  }

    getUsuarioEmail() {
        return localStorage.getItem('email');
  }

}