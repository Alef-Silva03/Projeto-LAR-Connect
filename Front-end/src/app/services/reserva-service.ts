import { Injectable } from '@angular/core';
import { ReservaRequest, ReservaResponse } from '../models/reserva.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class ReservaService {
    constructor(private http: HttpClient) { }

    realizarReserva(reserva: ReservaRequest): Observable<ReservaRequest> {
        return this.http.post<ReservaRequest>('http://localhost:8080/reservas/create', reserva, {withCredentials: true});
    }

      // Listar todos os comunicados do condomínio do usuário logado
    listarReservas(): Observable<ReservaResponse[]> {
        return this.http.get<ReservaResponse[]>('http://localhost:8080/reservas/listar', {withCredentials: true});
      }
    
    excluirReserva(id: number): Observable<void> {
        return this.http.delete<void>(`http://localhost:8080/reservas/excluir/${id}`, {withCredentials: true})
      }
}
