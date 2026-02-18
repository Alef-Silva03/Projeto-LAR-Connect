import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css']
})
export class Chat {
  abaAtiva = 'moradores';
  digitando = false;
  
  // Definimos valores padrão vazios para evitar erro de tipo
  mensagens: any[] = [
    { 
      texto: 'Oi! Veja como ficou a nova área gourmet.', 
      enviada: false, 
      hora: '10:45', 
      anexo: 'assets/imagem/condominio-aviso.jpg', 
      height: 'auto', 
      width: '200px' 
    },
    { texto: 'Ficou incrível! Vou passar lá mais tarde.', enviada: true, hora: '10:46', anexo: '', height: '', width: '' }
  ];

  enviar(input: HTMLInputElement) {
    if (input.value.trim() !== '') {
      const agora = new Date();
      this.mensagens.push({
        texto: input.value,
        enviada: true,
        hora: agora.getHours() + ':' + agora.getMinutes().toString().padStart(2, '0'),
        anexo: '', // String vazia em vez de undefined
        height: '',
        width: ''
      });
      input.value = '';
      this.responder();
    }
  }

  responder() {
    this.digitando = true;
    setTimeout(() => {
      this.digitando = false;
      this.mensagens.push({
        texto: 'Combinado! Nos vemos lá. 👋',
        enviada: false,
        hora: new Date().getHours() + ':' + new Date().getMinutes().toString().padStart(2, '0'),
        anexo: '', // String vazia em vez de undefined
        height: '',
        width: ''
      });
    }, 1500);
  }

  setAba(nome: string) {
    this.abaAtiva = nome;
  }
}