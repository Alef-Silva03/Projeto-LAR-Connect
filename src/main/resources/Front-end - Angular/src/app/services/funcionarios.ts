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

  adicionarFuncionario(email: string, cargo: string, idCondominio: number): Observable<any> {
    const payload = { idCondominio, cargo };
    return this.http.patch(`/api/usuarios/${email}`, payload, {withCredentials: true });
  }

  listarFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>('http://localhost:8080/api/funcionarios/condominio', {withCredentials: true});
  }

  removerFuncionario(email: string): Observable<any> {
    const cargo = '';
    const payload = { cargo };
    return this.http.patch(`http://localhost:8080/api/funcionarios/remover/${email}`, payload, {withCredentials: true })
  }
}