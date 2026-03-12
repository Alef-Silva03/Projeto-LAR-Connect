import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vaga, VagaResponse } from '../models/vaga.model';

@Injectable({
  providedIn: 'root'
})
export class VagaService {
  // Ajuste a URL base conforme sua API
  private apiUrl = 'http://localhost:8080/api/vagas';

  constructor(private http: HttpClient) { }

  // Buscar todas as vagas com paginação
  listarVagas(page: number = 0, size: number = 10): Observable<VagaResponse> {
    return this.http.get<VagaResponse>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  // Buscar vagas disponíveis para venda
  listarVagasDisponiveis(): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(`${this.apiUrl}/disponiveis`);
  }

  // Buscar vaga por ID
  buscarVagaPorId(id: number): Observable<Vaga> {
    return this.http.get<Vaga>(`${this.apiUrl}/${id}`);
  }

  // Comprar vaga
  comprarVaga(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/comprar`, {});
  }

  // Reservar vaga
  reservarVaga(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/reservar`, {});
  }

  // Liberar vaga (quando desocupar ou cancelar reserva)
  liberarVaga(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/liberar`, {});
  }

  // Filtrar vagas por status
  filtrarPorStatus(status: string): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(`${this.apiUrl}/status/${status}`);
  }
}