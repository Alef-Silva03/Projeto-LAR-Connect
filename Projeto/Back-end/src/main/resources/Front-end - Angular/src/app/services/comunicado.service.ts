import { Injectable } from '@angular/core';
import { Comunicado } from '../models/comunicado.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComunicadoService {

  private baseUrl = 'http://localhost:8080/sindico/api/comunicados';

  constructor(private http: HttpClient) { }

  // Enviar um novo comunicado
  enviarComunicado(comunicado: Comunicado): Observable<Comunicado> {
    return this.http.post<Comunicado>(`${this.baseUrl}/create`, comunicado, {withCredentials: true});
  }

  // Listar todos os comunicados do condomínio do usuário logado
  listarComunicados(): Observable<Comunicado[]> {
    return this.http.get<Comunicado[]>('http://localhost:8080/comunicados/listar', {withCredentials: true});
  }

  excluirComunicado(id: any): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/excluir/${id}`, {withCredentials: true})
  }
}