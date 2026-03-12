import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comunicado } from '../models/comunicado.model';

@Injectable({
  providedIn: 'root'
})
export class ComunicadoService {
  private apiUrl = '/sindico/api/comunicados';

  constructor(private http: HttpClient) {}

  createComunicado(data: Partial<Comunicado>): Observable<Comunicado> {
    return this.http.post<Comunicado>(`${this.apiUrl}/create`, data);
  }

  listarComunicados(): Observable<Comunicado[]> {
    return this.http.get<Comunicado[]>('/painel_comunicados/listar');
  }
}