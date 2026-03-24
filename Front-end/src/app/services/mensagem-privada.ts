import { Injectable } from '@angular/core';
import { MensagemPrivada } from '../models/mensagemPrivada.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface MensagemPrivadaRequest {
  tipo: string;
  titulo: string;
  assunto: string;
  texto: string;
  idDestinatario: number;
}

@Injectable({
  providedIn: 'root'
})
export class MensagemPrivadaService {

  constructor(private http: HttpClient) { }

  enviarMensagem(mensagem: MensagemPrivadaRequest): Observable<any> {
    return this.http.post('http://localhost:8080/mensagemPrivada/create', mensagem, {withCredentials: true});
  }

  listarMensagens(): Observable<MensagemPrivada[]> {
    return this.http.get<MensagemPrivada[]>('http://localhost:8080/mensagemPrivada/listar', {withCredentials: true});
  }

  excluirMensagem(id: any): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/mensagemPrivada/excluir/${id}`, {withCredentials: true})
  }
}