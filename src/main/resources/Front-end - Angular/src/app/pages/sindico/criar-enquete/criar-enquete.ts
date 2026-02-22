import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-criar-enquete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './criar-enquete.html',
  styleUrls: ['./criar-enquete.css']
})
export class CriarEnquete {
  enquete = {
    titulo: '',
    opcoes: ['', ''], // Começa com duas opções vazias
    dataFim: '',
    tipo: 'publica'
  };

  adicionarOpcao() {
    this.enquete.opcoes.push('');
  }

  removerOpcao(index: number) {
    if (this.enquete.opcoes.length > 2) {
      this.enquete.opcoes.splice(index, 1);
    }
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  publicarEnquete() {
    console.log('Enquete Publicada:', this.enquete);
    alert('Enquete publicada com sucesso para todos os moradores!');
  }
}