import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Morador {
  nome: string;
  apartamento?: string;
  email: string;
  perfil: string;
  cargo?: string;
}

@Injectable({
  providedIn: 'root' 
})
export class MoradoresService {


  constructor(private http: HttpClient) {}

  adicionarMorador(emailMorador: string, apartamento: string, idCondominio: number): Observable<any> {
    const payload = { idCondominio, apartamento };
    return this.http.patch(`/api/usuarios/${emailMorador}`, payload, {
      withCredentials: true  // Equivalente a credentials: 'include' no fetch
    });
  }

  listarMoradores(): Observable<Morador[]> {
    return this.http.get<Morador[]>('/api/moradores/condominio', {
      withCredentials: true
    });
  }
}