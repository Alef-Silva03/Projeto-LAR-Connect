import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Morador {
  nome: string;
  apartamento?: string;
  bloco?: string;
  vaga?: string;
  email: string;
  perfil: string;
  cargo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MoradoresService {


  constructor(private http: HttpClient) {};

  adicionarMorador(emailMorador: string, apartamento: string, bloco: string, vaga: string, idCondominio: number): Observable<any> {
    const payload = { idCondominio, apartamento, bloco, vaga };
    return this.http.patch(`http://localhost:8080/api/usuarios/${emailMorador}`, payload, {withCredentials: true });
  };

  listarMoradores(): Observable<Morador[]> {
    return this.http.get<Morador[]>('http://localhost:8080/api/moradores/condominio', {withCredentials: true});
  };

  removerMorador(email: string): Observable<any> {
    const apartamento = '';
    const bloco = '';
    const vaga = '';
    const payload = { apartamento, bloco, vaga };
    return this.http.patch(`http://localhost:8080/api/moradores/remover/${email}`, payload, {withCredentials: true });
  };
};