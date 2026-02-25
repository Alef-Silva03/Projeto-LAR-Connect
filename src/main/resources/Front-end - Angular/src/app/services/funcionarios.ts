import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Funcionario {
  nome: string;
  apartamento?: string;
  email: string;
  perfil: string;
  cargo?: string;
}

@Injectable({
  providedIn: 'root' 
})
export class FuncionariosService {


  constructor(private http: HttpClient) {}

  adicionarFuncionario(emailFuncionario: string, cargo: string, idCondominio: number): Observable<any> {
    const payload = { idCondominio, cargo };
    return this.http.patch(`/api/usuarios/${emailFuncionario}`, payload, {
      withCredentials: true  // Equivalente a credentials: 'include' no fetch
    });
  }

  removerFuncionario(emailFuncionario: string): Observable<any> {
    const payload = { idCondominio: null, cargo: null };
    return this.http.patch(`/api/usuarios/${emailFuncionario}`, payload, {
      withCredentials: true  // Equivalente a credentials: 'include' no fetch
    });
  }

  listarFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>('/api/funcionarios/condominio', {
      withCredentials: true
    });
  }
}