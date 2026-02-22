import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  login(dados: any): Observable<any> {
    return this.http.post(`${this.API}/login`, dados);
  }

  cadastrar(usuario: any): Observable<any> {
    return this.http.post(`${this.API}/usuarios`, usuario); // Ajuste a rota conforme seu controller
  }
}