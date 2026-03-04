// src/app/services/password-reset.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  private apiUrl = 'http://localhost:8080/api'; // Ajuste conforme sua URL do backend

  constructor(private http: HttpClient) { }

  solicitarReset(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/redefinir-senha`, { email });
  }

  salvarNovaSenha(token: string, novaSenha: string, confirmarSenha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/nova-senha`, {
      token,
      novaSenha,
      confirmarSenha
    });
  }
}