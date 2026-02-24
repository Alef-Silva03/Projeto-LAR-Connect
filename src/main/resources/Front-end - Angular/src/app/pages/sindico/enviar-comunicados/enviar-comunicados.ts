import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enviar-comunicado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enviar-comunicados.html',
  styleUrls: ['./enviar-comunicados.css']
})
export class EnviarComunicados implements OnInit {
  comunicado = {
    tipo: '',
    assunto: '',
    texto: ''
  };

  comunicados: any[] = [];

 constructor(
    private http: HttpClient, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarComunicados();
  }

  carregarComunicados() {
    this.http.get<any[]>('http://localhost:8080/sindico/api/comunicados/listar', {
      withCredentials: true
    }).subscribe({
      next: (dados) => {
        this.comunicados = dados;
      },
      error: (err) => {
        console.error('Erro ao carregar comunicados:', err);
      }
    });
  }

  enviarComunicado() {
    const usuarioString = localStorage.getItem('usuario');
    if (!usuarioString) {
      alert('Usuário não encontrado. Faça login novamente.');
      return;
    }

    const usuario = JSON.parse(usuarioString);
    const idCondominio = usuario.condominio?.id;
    if (!idCondominio) {
      alert('Condomínio não identificado.');
      return;
    }

    const payload = {
      tipo: this.comunicado.tipo,
      titulo: this.comunicado.assunto,
      texto: this.comunicado.texto,
      idCondominio: idCondominio
    };

    this.http.post('http://localhost:8080/sindico/api/comunicados/create', payload, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    }).subscribe({
      next: (res) => {
        alert('Comunicado postado com sucesso!');
        this.comunicado = { tipo: '', assunto: '', texto: '' };
        this.carregarComunicados();
      },
      error: (err) => {
        console.error('Erro na postagem:', err);
        alert('Erro ao postar comunicado. Verifique o console.');
      }
    });
  }
}