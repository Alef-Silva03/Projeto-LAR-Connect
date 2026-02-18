import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly URL = 'http://localhost:8080/api'; // Ajuste para a URL do seu Spring Boot

  constructor(private http: HttpClient) {}

  // Exemplo para o seu cadastro.html
  salvarUsuario(dados: any): Observable<any> {
    return this.http.post(`${this.URL}/usuarios/salvar`, dados);
  }

  // Exemplo para carregar dados da sua conta
  getPerfil(): Observable<any> {
    return this.http.get(`${this.URL}/dashboard/perfil`);
  }
}