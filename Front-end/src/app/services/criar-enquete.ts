import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enquete } from '../models/enquete.model';
import { Observable } from 'rxjs';

export interface EnqueteUpdate {
    titulo?: string;
    opcao1?: string;
    opcao2?: string;
    votosOpcao1?: number;
    votosOpcao2?: number;
    ativo?: boolean;
    idCondominio?: number;
    votoSelecionado?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CriarEnquete {
  constructor(private http: HttpClient) {}

  criarEnquete(enquete: Enquete): Observable<Enquete> {
    return this.http.post<Enquete>('http://localhost:8080/enquetes/api/create', enquete, {withCredentials: true});
  }

  listarEnquetes(): Observable<Enquete[]> {
    return this.http.get<Enquete[]>('http://localhost:8080/enquetes/api/listar', {withCredentials: true});
  }

  atualizarEnquete(enquete: Enquete): Observable<Enquete> {
    return this.http.put<Enquete>(`http://localhost:8080/enquetes/api/atualizar/${enquete.id}`, enquete, {withCredentials: true});
  }

}