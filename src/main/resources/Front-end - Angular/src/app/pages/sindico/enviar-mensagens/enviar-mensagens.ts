import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enviar-mensagens',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enviar-mensagens.html',
  styleUrls: ['./enviar-mensagens.css']
})
export class EnviarMensagens {
  destino: string = 'todos';
  arquivoNome: string = '';

  setDestino(tipo: string) {
    this.destino = tipo;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.arquivoNome = file.name;
    }
  }
}