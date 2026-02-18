import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-criar-condominio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './criar-condominio.html',
  styleUrls: ['./criar-condominio.css']
})
export class CriarCondominio {
  dados = {
    nome: '',
    endereco: '',
    descricao: ''
  };

  salvarCondominio() {
    console.log('Dados salvos localmente:', this.dados);
    alert(`Sucesso! O condomínio ${this.dados.nome} foi criado.`);
    // Futura integração com o service do Spring Boot
  }
}