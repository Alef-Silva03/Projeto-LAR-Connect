import { Injectable } from '@angular/core';
import { Reserva } from '../models/reserva.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class ReservaService {
    constructor(private http: HttpClient) { }

    realizarReserva(reserva: Reserva): Observable<Reserva> {
        return this.http.post<Reserva>('http://localhost:8080/reservas/create', reserva, {withCredentials: true});
    }
}
