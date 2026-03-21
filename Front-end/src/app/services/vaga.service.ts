import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnuncioVagaRequest, ElegibilidadeAnuncioVaga, Vaga } from '../models/vaga.model';

@Injectable({
  providedIn: 'root'
})
export class VagaService {
  private apiUrl = '/api/vagas';
  private compraApiUrl = '/api/compras-vagas';

  constructor(private http: HttpClient) {}

  listarVagas(): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(this.apiUrl, { withCredentials: true });
  }

  listarVagasDisponiveis(): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(`${this.apiUrl}/disponiveis`, { withCredentials: true });
  }

  buscarVagaPorId(id: number): Observable<Vaga> {
    return this.http.get<Vaga>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  consultarElegibilidadeAnuncio(): Observable<ElegibilidadeAnuncioVaga> {
    return this.http.get<ElegibilidadeAnuncioVaga>(`${this.apiUrl}/minha/elegibilidade-anuncio`, { withCredentials: true });
  }

  anunciarMinhaVaga(payload: AnuncioVagaRequest): Observable<Vaga> {
    return this.http.post<Vaga>(`${this.apiUrl}/minha/anunciar`, payload, { withCredentials: true });
  }

  comprarVaga(vagaId: number, compradorId: number): Observable<unknown> {
    return this.http.post(`${this.compraApiUrl}/iniciar`, {
      vagaId,
      compradorId,
      metodoPagamento: 'PIX',
      observacoes: 'Compra iniciada pelo painel de vagas'
    }, { withCredentials: true });
  }
}
