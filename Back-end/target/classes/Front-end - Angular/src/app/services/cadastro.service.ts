import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CadastroRequest {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  telefone: string;
  perfil: string;
}

export interface CadastroResponse {
  id: number;
  nome: string;
  email: string;
  perfil: string;
}

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private readonly API = 'http://localhost:8080/usuarios/salvar'; // Usando proxy, não precisa do localhost

  constructor(private http: HttpClient) {}

  cadastrar(dados: CadastroRequest): Observable<CadastroResponse> {
    // Criar FormData porque o backend espera multipart/form-data
    const formData = new FormData();
    formData.append('nome', dados.nome);
    formData.append('email', dados.email);
    formData.append('senha', dados.senha);
    formData.append('cpf', dados.cpf);
    formData.append('telefone', dados.telefone);
    formData.append('perfil', dados.perfil);

    return this.http.post<CadastroResponse>(this.API, formData);
  }
}