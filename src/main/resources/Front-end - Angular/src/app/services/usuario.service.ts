import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

export interface UsuarioUpdate {
  idCondominio?: number;
  nome?: string;
  email?: string;
  cpf?: string;
  telefone?: string;
  apartamento?: string;
  cargo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  static getCondominioId() {
      throw new Error('Method not implemented.');
  }
  private apiUrl = '/api/usuarios';

  constructor(private http: HttpClient) {}

  updateUsuario(email: string, data: UsuarioUpdate): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.apiUrl}/${email}`, data);
  }
}