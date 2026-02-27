import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service'; // IMPORTANDO O SERVICE
import { Mensagem, Contato } from '../../models/mensagem.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css']
})
export class Chat implements OnInit, AfterViewChecked {
  @ViewChild('msgInput') msgInput!: ElementRef<HTMLInputElement>;
  @ViewChild('messageDisplay') messageDisplay!: ElementRef<HTMLDivElement>;

  abaAtiva: 'moradores' | 'grupos' = 'moradores';
  digitando = false;
  contatoSelecionado: Contato | null = null;
  mensagemTexto = '';
  carregando = false;
  
  // Dados
  moradores: Contato[] = [];
  grupos: any[] = [];
  mensagens: Mensagem[] = [];
  
  // Subscriptions
  private subscriptions: Subscription[] = [];

  constructor(private chatService: ChatService) {} // INJETANDO O SERVICE

  ngOnInit() {
    this.carregarMoradores();
    this.carregarGrupos();
    
    // Subscribe ao status de digitando
    this.subscriptions.push(
      this.chatService.digitando$.subscribe(status => {
        this.digitando = status;
      })
    );
  }

  ngAfterViewChecked() {
    this.scrollParaUltimaMensagem();
  }

  ngOnDestroy() {
    // Limpa subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  carregarMoradores() {
    this.chatService.getMoradores().subscribe({
      next: (moradores) => {
        this.moradores = moradores;
        if (moradores.length > 0) {
          this.selecionarContato(moradores[0]);
        }
      },
      error: (erro) => {
        console.error('Erro ao carregar moradores:', erro);
        // Dados mockados para teste
        this.moradores = [
          { 
            id: 1, 
            nome: 'Júlia', 
            apartamento: '402', 
            avatar: 'assets/imagem/Julia.png', 
            online: true 
          }
        ];
      }
    });
  }

  carregarGrupos() {
    this.chatService.getGrupos().subscribe({
      next: (grupos) => this.grupos = grupos,
      error: (erro) => console.error('Erro ao carregar grupos:', erro)
    });
  }

  setAba(aba: 'moradores' | 'grupos') {
    this.abaAtiva = aba;
    this.contatoSelecionado = null;
  }

  selecionarContato(contato: Contato) {
    this.contatoSelecionado = contato;
    this.carregarMensagens(contato.id);
  }

  carregarMensagens(contatoId: number) {
    this.carregando = true;
    this.chatService.getMensagens(contatoId).subscribe({
      next: (mensagens) => {
        this.mensagens = mensagens;
        this.carregando = false;
      },
      error: (erro) => {
        console.error('Erro ao carregar mensagens:', erro);
        this.carregando = false;
      }
    });
  }

  enviar() {
    const texto = this.mensagemTexto.trim();
    
    if (texto && this.contatoSelecionado) {
      const agora = new Date();
      const hora = this.formatarHora(agora);
      
      const novaMensagem: Mensagem = {
        texto: texto,
        enviada: true,
        hora: hora,
        data: agora,
        lida: false,
        destinatarioId: this.contatoSelecionado.id
      };

      // Adiciona otimisticamente
      this.mensagens.push(novaMensagem);
      this.mensagemTexto = '';

      // Envia para o backend
      this.chatService.enviarMensagem(novaMensagem).subscribe({
        next: (mensagemSalva) => {
          // Substitui a mensagem otimista pela salva
          const index = this.mensagens.findIndex(m => m === novaMensagem);
          if (index !== -1) {
            this.mensagens[index] = mensagemSalva;
          }
        },
        error: (erro) => {
          console.error('Erro ao enviar mensagem:', erro);
          // Remove a mensagem otimista em caso de erro
          this.mensagens = this.mensagens.filter(m => m !== novaMensagem);
        }
      });

      // Notifica que está digitando (opcional)
      this.chatService.setDigitando(this.contatoSelecionado.id, false);
    }
  }

  onTyping() {
    if (this.contatoSelecionado) {
      this.chatService.setDigitando(this.contatoSelecionado.id, true);
      
      // Para de "digitando" após 2 segundos
      setTimeout(() => {
        this.chatService.setDigitando(this.contatoSelecionado!.id, false);
      }, 2000);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0] && this.contatoSelecionado) {
      const file = input.files[0];
      
      // Validações
      if (!file.type.startsWith('image/')) {
        alert('Apenas imagens são permitidas');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('Imagem muito grande. Máximo 5MB');
        return;
      }

      // Preview local
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        
        // Adiciona mensagem com anexo
        const mensagem: Mensagem = {
          texto: '',
          enviada: true,
          hora: this.formatarHora(new Date()),
          anexo: base64,
          width: '200px',
          height: 'auto',
          destinatarioId: this.contatoSelecionado!.id
        };
        
        this.mensagens.push(mensagem);
        
        // Aqui você faria upload real
        // this.chatService.uploadImagem(file).subscribe(url => {
        //   mensagem.anexo = url;
        // });
      };
      reader.readAsDataURL(file);
    }
  }

  marcarComoLida(mensagem: Mensagem) {
    if (!mensagem.lida && !mensagem.enviada && mensagem.id) {
      this.chatService.marcarComoLida(mensagem.id).subscribe();
    }
  }

  private scrollParaUltimaMensagem() {
    try {
      const element = this.messageDisplay?.nativeElement;
      if (element) {
        element.scrollTop = element.scrollHeight;
      }
    } catch (err) {}
  }

  private formatarHora(data: Date): string {
    return data.getHours() + ':' + data.getMinutes().toString().padStart(2, '0');
  }
}