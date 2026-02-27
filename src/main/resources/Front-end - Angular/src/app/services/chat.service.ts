import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Mensagem, Contato, Grupo } from '../models/mensagem.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  [x: string]: any;
  private apiUrl = 'http://localhost:8080/api/chat'; // Ajuste para sua URL Java
  
  // Para controle de "digitando"
  private digitandoSubject = new BehaviorSubject<boolean>(false);
  digitando$ = this.digitandoSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Mensagens
  getMensagens(contatoId: number): Observable<Mensagem[]> {
    return this.http.get<Mensagem[]>(`${this.apiUrl}/mensagens/${contatoId}`);
  }

  enviarMensagem(mensagem: Mensagem): Observable<Mensagem> {
    return this.http.post<Mensagem>(`${this.apiUrl}/enviar`, mensagem);
  }

  marcarComoLida(mensagemId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/mensagens/${mensagemId}/lida`, {});
  }

  // Contatos
  getMoradores(): Observable<Contato[]> {
    return this.http.get<Contato[]>(`${this.apiUrl}/moradores`);
  }

  getGrupos(): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(`${this.apiUrl}/grupos`);
  }

  // Status
  setDigitando(contatoId: number, status: boolean): void {
    this.digitandoSubject.next(status);
    // Aqui você pode chamar um endpoint WebSocket se tiver
    // this.http.post(`${this.apiUrl}/digitando/${contatoId}`, { status }).subscribe();
  }
}