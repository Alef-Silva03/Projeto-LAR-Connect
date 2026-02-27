import { Injectable } from '@angular/core';
import { Mensagem } from '../models/mensagem.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  private baseUrl = 'http://localhost:8080/mensagens';

  constructor(private http: HttpClient) { }

  // Enviar um novo mensagem
  enviarMensagem(mensagem: Mensagem): Observable<Mensagem> {
    return this.http.post<Mensagem>(`${this.baseUrl}/create`, mensagem, {withCredentials: true});
  }

  // Listar todos os mensagens do condomínio do usuário logado
  listarMensagens(): Observable<Mensagem[]> {
    return this.http.get<Mensagem[]>(`${this.baseUrl}/listar`, {withCredentials: true});
  }

  excluirMensagem(id: any): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/excluir/${id}`, {withCredentials: true})
  }
}