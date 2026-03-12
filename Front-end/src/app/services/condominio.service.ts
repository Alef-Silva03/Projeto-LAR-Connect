import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CondominioRequest, CondominioResponse } from '../models/condominio.model';

@Injectable({
  providedIn: 'root'
})
export class CondominioService {
  private apiUrl = '/sindico/api/condominio';

  constructor(private http: HttpClient) {}

  createCondominio(data: CondominioRequest): Observable<CondominioResponse> {
    return this.http.post<CondominioResponse>(`${this.apiUrl}/create`, data);
  }
}