import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MensagemPrivadaService } from '../../services/mensagem-privada';
import { MensagemPrivada } from '../../models/mensagemPrivada.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mensagem-ao-sindico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mensagem-ao-sindico.html',
  styleUrl: './mensagem-ao-sindico.css',
})

export class MensagemAoSindico {
  mensagemPrivada: MensagemPrivada = {
    tipo: 'MensagemAoSindico',
    titulo: '',
    assunto: '',
    texto: '',
    condominio: {
      id: 0,
      nomeCondominio: '',
      cep: '',
      pais: '',
      estado: '',
      cidade: '',
      logradouro: '',
      numeroCondominio: 0,
      blocos: 0,
      apartamentos: 0
    },
  };

  constructor(
    private mensagemPrivadaService: MensagemPrivadaService,
    public authService: AuthService,
  ) {}

  enviarMensagemAoSindico(): void {
    const usuarioString = localStorage.getItem('usuario');
    if (!usuarioString) {
      alert('Usuário não encontrado. Faça login novamente.');
      return;
    }
    const usuario = JSON.parse(usuarioString);

    this.mensagemPrivada.condominio = usuario.condominio?.id;
    this.mensagemPrivadaService.enviarMensagem(this.mensagemPrivada).subscribe({
      next: () => {
        alert('Mensagem enviada com sucesso!');
        this.mensagemPrivada = { tipo: 'Mensagem ao Síndico', titulo: '', assunto: '', texto: '', condominio: this.mensagemPrivada.condominio }; // limpa formulário
      },
      error: (err) => {
        console.error('Erro ao enviar comunicado', err);
        alert('Erro ao postar comunicado. Verifique o console.');
      }
    });
  }

}