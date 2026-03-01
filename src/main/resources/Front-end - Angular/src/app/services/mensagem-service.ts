import { Injectable } from '@angular/core';
import { MensagemResponse, MensagemRequest } from '../models/mensagem.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  private baseUrl = 'http://localhost:8080/chat';

  constructor(private http: HttpClient) { }

  // Enviar um novo mensagem
  enviarMensagem(mensagem: MensagemRequest): Observable<MensagemRequest> {
    return this.http.post<MensagemRequest>(`${this.baseUrl}/create`, mensagem, {withCredentials: true});
  }

  // Listar todos os mensagens do condomínio do usuário logado
  listarMensagens(): Observable<MensagemResponse[]> {
    return this.http.get<MensagemResponse[]>(`${this.baseUrl}/listar`, {withCredentials: true});
  }

  excluirMensagem(id: any): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/excluir/${id}`, {withCredentials: true})
  }
}