import { Injectable } from '@angular/core';
import { MensagemPrivada } from '../models/mensagemPrivada.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MensagemPrivadaService {

  constructor(private http: HttpClient) { }

  enviarMensagem(mensagem: MensagemPrivada): Observable<MensagemPrivada> {
    return this.http.post<MensagemPrivada>('http://localhost:8080/mensagemPrivada/create', mensagem, {withCredentials: true});
  }

  listarMensagens(): Observable<MensagemPrivada[]> {
    return this.http.get<MensagemPrivada[]>('http://localhost:8080/mensagemPrivada/listar', {withCredentials: true});
  }

    excluirMensagem(id: any): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/mensagemPrivada/excluir/${id}`, {withCredentials: true})
  }
}