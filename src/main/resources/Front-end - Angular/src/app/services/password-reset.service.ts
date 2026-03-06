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

  // Método existente - solicitar reset por email
  solicitarReset(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/redefinir-senha`, { email }, {withCredentials: true});
  }

  // Método existente - salvar nova senha (renomeado para ficar mais claro)
  redefinirSenha(dados: { token: string; novaSenha: string; confirmarSenha: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/nova-senha`, {
      token: dados.token,
      novaSenha: dados.novaSenha,
      confirmarSenha: dados.confirmarSenha
    }, {withCredentials: true});
  }

  // NOVO MÉTODO OPCIONAL: validar se o token é válido antes de mostrar o formulário
  validarToken(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/validar-token/${token}`, {withCredentials: true});
  }
}