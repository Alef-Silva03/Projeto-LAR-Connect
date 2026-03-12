import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class GestaoEncomendasService {
  private readonly API = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // --- MÉTODOS DE ENCOMENDAS (Portaria) ---

  listarEncomendas(): Observable<any[]> {
    // Busca apenas as pendentes para o porteiro
    return this.http.get<any[]>(`${this.API}/portaria/encomendas-pendentes`);
  }

  registrarEncomenda(encomenda: any): Observable<any> {
    return this.http.post(`http://localhost:8080/api/encomendas`, encomenda);
  }

  finalizarEntrega(id: number): Observable<any> {
    // Muda o status para entregue=true e encerra o ciclo
    return this.http.patch(`${this.API}/portaria/entregar/${id}`, {});
  }

  // --- NOVOS MÉTODOS: NOTIFICAÇÕES E HISTÓRICO ---

  listarNotificacoesMorador(usuarioId: number): Observable<any[]> {
    // Busca os alertas que aparecerão na tela do morador
    return this.http.get<any[]>(`${this.API}/notificacoes/usuario/${usuarioId}`);
  }

  marcarNotificacaoComoLida(id: number): Observable<any> {
    // Remove o alerta da tela do morador após ele clicar em "OK"
    return this.http.patch(`${this.API}/notificacoes/${id}/marcar-lida`, {});
  }

  // Se você criou o endpoint de histórico no EncomendaController (opcional):
  listarHistorico(apartamento: string, bloco: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API}/portaria/historico`);
  }
}