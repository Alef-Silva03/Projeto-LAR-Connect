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

  atualizarEnquete(enquete: Enquete, updateData: EnqueteUpdate): Observable<Enquete> {
    if (enquete.votoSelecionado) {
      if (enquete.votoSelecionado === 'opcao1') {
        updateData.votosOpcao1 = (enquete.votosOpcao1 || 0) + 1;
      } else if (enquete.votoSelecionado === 'opcao2') {
        updateData.votosOpcao2 = (enquete.votosOpcao2 || 0) + 1;
      }
    }   
    return this.http.put<Enquete>(`http://localhost:8080/enquetes/api/atualizar/${enquete.id}`, updateData, {withCredentials: true});
  }

}