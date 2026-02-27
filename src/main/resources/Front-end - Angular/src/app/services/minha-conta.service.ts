/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario, AlterarSenhaRequest, Boleto, Notificacao } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class MinhaContaService {
  private apiUrl = '/api/usuarios';

  constructor(private http: HttpClient) {}

  // ===== DADOS DO USUÁRIO =====
  getDadosUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuarios/meus-dados`);
  }

  atualizarDadosPessoais(dados: Partial<Usuario>): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/usuarios/atualizar`, dados);
  }

  // ===== CPF =====
  cadastrarCPF(cpf: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios/cpf`, { cpf });
  }

  verificarCPF(): Observable<{ verificado: boolean }> {
    return this.http.get<{ verificado: boolean }>(`${this.apiUrl}/usuarios/cpf/verificado`);
  }

  // ===== SEGURANÇA =====
  alterarSenha(request: AlterarSenhaRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios/alterar-senha`, request);
  }

  configurar2FA(ativar: boolean): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios/2fa`, { ativar });
  }

  verificar2FA(codigo: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/usuarios/2fa/verificar`, { codigo });
  }

  // ===== BOLETOS =====
  getBoletos(): Observable<Boleto[]> {
    return this.http.get<Boleto[]>(`${this.apiUrl}/boletos`);
  }

  getBoletoPorId(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/boletos/${id}/pdf`, {
      responseType: 'blob'
    });
  }

  baixarBoleto(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/boletos/${id}/download`, {
      responseType: 'blob'
    });
  }

  // ===== NOTIFICAÇÕES =====
  getNotificacoes(): Observable<Notificacao[]> {
    return this.http.get<Notificacao[]>(`${this.apiUrl}/notificacoes`);
  }

  marcarNotificacaoComoLida(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/notificacoes/${id}/lida`, {});
  }

  marcarTodasNotificacoesComoLidas(): Observable<any> {
    return this.http.put(`${this.apiUrl}/notificacoes/marcar-todas-lidas`, {});
  }

  toggleImportante(id: number, importante: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/notificacoes/${id}/importante`, { importante });
  }

  getNotificacoesNaoLidas(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/notificacoes/nao-lidas/contagem`);
  }
} */