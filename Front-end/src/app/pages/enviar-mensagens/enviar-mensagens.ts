import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagemPrivada } from '../../models/mensagemPrivada.model';
import { FormsModule } from '@angular/forms';
import { Morador, MoradoresService } from '../../services/moradores';
import { AuthService } from '../../services/auth.service';
import { MensagemPrivadaService } from '../../services/mensagem-privada';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-enviar-mensagens',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enviar-mensagens.html',
  styleUrls: ['./enviar-mensagens.css']
})

export class EnviarMensagens implements OnInit {
  moradores$: any;
  moradoresList: Morador[] = []; // Lista completa de moradores
  console = console;

  mensagemPrivada: MensagemPrivada = {
    tipo: 'MensagemAoMorador',
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
    idDestinatario: 0,
  };

  constructor(
    private moradoresService: MoradoresService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef,
    private mensagemPrivadaService: MensagemPrivadaService
  ) {}

  ngOnInit(): void {
    this.cdr.detectChanges();
    // Carregar moradores e armazenar em uma lista
    this.moradores$ = this.moradoresService.listarMoradores().pipe(
      map((moradores: Morador[]) => {
        this.moradoresList = moradores;
        return moradores;
      })
    );
  }

  enviarMensagem(): void {
    // Validar se um destinatário foi selecionado
    if (!this.mensagemPrivada.idDestinatario || this.mensagemPrivada.idDestinatario === 0) {
      alert('Por favor, selecione um morador destinatário.');
      return;
    }

    // Validar campos obrigatórios
    if (!this.mensagemPrivada.titulo || !this.mensagemPrivada.texto) {
      alert('Por favor, preencha o título e o texto da mensagem.');
      return;
    }

    const usuarioString = localStorage.getItem('usuario');
    if (!usuarioString) {
      alert('Usuário não encontrado. Faça login novamente.');
      return;
    }
    
    const usuario = JSON.parse(usuarioString);
    
    // Corrigir: atribuir o objeto condominio completo, não apenas o id
    if (usuario.condominio) {
      this.mensagemPrivada.condominio = {
        id: usuario.condominio.id,
        nomeCondominio: usuario.condominio.nomeCondominio || '',
        cep: usuario.condominio.cep || '',
        pais: usuario.condominio.pais || '',
        estado: usuario.condominio.estado || '',
        cidade: usuario.condominio.cidade || '',
        logradouro: usuario.condominio.logradouro || '',
        numeroCondominio: usuario.condominio.numeroCondominio || 0,
        blocos: usuario.condominio.blocos || 0,
        apartamentos: usuario.condominio.apartamentos || 0
      };
    }

    // Criar o payload no formato esperado pelo backend
    const payload = {
      tipo: this.mensagemPrivada.tipo,
      titulo: this.mensagemPrivada.titulo,
      assunto: this.mensagemPrivada.assunto,
      texto: this.mensagemPrivada.texto,
      idDestinatario: this.mensagemPrivada.idDestinatario // Envia apenas o ID
    };

    this.mensagemPrivadaService.enviarMensagem(payload).subscribe({
      next: () => {
        alert('Mensagem enviada com sucesso!');
        // Limpar formulário
        this.mensagemPrivada = {
          tipo: 'MensagemAoMorador',
          titulo: '',
          assunto: '',
          texto: '',
          condominio: this.mensagemPrivada.condominio,
          idDestinatario: 0,
        };
      },
      error: (err) => {
        console.error('Erro ao enviar mensagem', err);
        alert('Erro ao enviar mensagem. Verifique o console.');
      }
    });
  }
}