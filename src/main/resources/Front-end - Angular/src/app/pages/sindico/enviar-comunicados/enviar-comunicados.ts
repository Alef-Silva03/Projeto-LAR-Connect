import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-enviar-comunicados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enviar-comunicados.html',
  styleUrls: ['./enviar-comunicados.css']
})
export class EnviarComunicados {
  comunicado = {
    tipo: '',
    assunto: '',
    texto: ''
  };

  enviarComunicado() {
    console.log('Comunicado enviado:', this.comunicado);
    alert('Comunicado enviado com sucesso aos moradores!');
    // Limpar formulário após envio
    this.comunicado = { tipo: '', assunto: '', texto: '' };
  }
}