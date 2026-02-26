import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importe HttpHeaders
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CondominioRequest, CondominioResponse } from '../../../models/condominio.model';
import { error } from 'console';

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

  async salvarCondominio() {
    this.criarCondominio(this.condominio).subscribe({
      next: async (res: CondominioResponse) => {
        const condominioCriado = res;
        const email = localStorage.getItem("email");

        const payload2 = { idCondominio: condominioCriado.id };

        const res2 = await fetch(`/api/usuarios/${email}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: 'include',
          body: JSON.stringify(payload2),
        });

        if (!res2.ok) {
          const errorText = await res2.text();
          console.error("Erro na atualização do usuário:", errorText);
        }

        localStorage.setItem("condominio", condominioCriado.nomeCondominio);
        alert("Condomínio criado com sucesso!");
        window.location.href = "/dashboard";
      },
      error: (err: any) => {
        console.error('Erro ao criar condomínio', err);
        alert('Erro ao criar condomínio. Verifique os dados e tente novamente.');
      }
    });
  }
}
