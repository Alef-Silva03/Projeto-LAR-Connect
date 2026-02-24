import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importe HttpHeaders
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CondominioRequest, CondominioResponse } from '../../../models/condominio.model';

@Component({
  selector: 'app-criar-condominio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './criar-condominio.html',
  styleUrls: ['./criar-condominio.css']
})
export class CriarCondominio {

  condominio = {
    nomeCondominio: '',
    cep: '',
    pais: '',
    estado: '',
    cidade: '',
    logradouro: '',
    numeroCondominio: 0,
    blocos: 0,
    apartamentos: 0,
  };

  private apiUrl = 'http://localhost:8080/sindico/api/condominio/create';

  constructor(
    private http: HttpClient, 
    private router: Router
  ) {}

  criarCondominio(condominio: CondominioRequest): Observable<CondominioResponse> {

    return this.http.post<CondominioResponse>(this.apiUrl, condominio, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    });
  }

  salvarCondominio() {
    this.criarCondominio(this.condominio).subscribe({
      next: (res) => {
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/dashboard-sindico']);
      },
      error: (err) => {
        console.error('Erro completo:', err);
        if (err.status === 403) {
          alert('Acesso negado. Verifique se você está logado como síndico.');
        } else if (err.status === 400) {
          alert('Dados inválidos. Verifique todos os campos.');
        } else {
          alert('Erro ao cadastrar. Tente novamente mais tarde.');
        }
      }
    });
  }
}