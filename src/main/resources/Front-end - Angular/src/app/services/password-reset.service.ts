// src/app/services/password-reset.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // HEADERS CORRETOS para o backend Java
  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      withCredentials: true // Importante para manter a sessão
    };
  }

  // 1. Primeiro passo: solicitar redefinição (envia apenas email)
  solicitarReset(email: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/redefinir-senha`, 
      { email }, 
      this.getHttpOptions()
    );
  }

  // 2. Segundo passo: redefinir senha com token
  redefinirSenha(dados: { token: string; novaSenha: string }): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/nova-senha`, 
      {
        token: dados.token,
        novaSenha: dados.novaSenha
      },
      this.getHttpOptions()
    );
  }

  // 3. Validar token
  validarToken(token: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/validar-token/${token}`,
      this.getHttpOptions()
    );
  }
}