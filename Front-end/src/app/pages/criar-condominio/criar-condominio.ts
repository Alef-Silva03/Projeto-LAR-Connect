import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CondominioRequest, CondominioResponse } from '../../models/condominio.model';

@Component({
  selector: 'app-criar-condominio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './criar-condominio.html',
  styleUrls: ['./criar-condominio.css']
})
export class CriarCondominio {
  condominio = {
    nomeCondominio: '',
    cep: '',
    pais: 'Brasil',
    estado: '',
    cidade: '',
    logradouro: '',
    numeroCondominio: 0,
    blocos: 0,
    apartamentos: 0,
  };

  private apiUrl = 'http://localhost:8080/sindico/api/condominio/create';
  buscandoCep = false;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  buscarCep(cep: string): void {
    const cepNumerico = cep.replace(/\D/g, '');
    if (cepNumerico.length !== 8) {
      return;
    }

    this.buscandoCep = true;
    this.http.get<any>(`https://viacep.com.br/ws/${cepNumerico}/json/`).subscribe({
      next: (data) => {
        if (data.erro) {
          alert('CEP nao encontrado. Por favor, verifique o numero digitado.');
          this.limparCamposEndereco();
          return;
        }

        this.condominio.logradouro = data.logradouro || '';
        this.condominio.cidade = data.localidade || '';
        this.condominio.estado = data.uf || '';
        this.condominio.pais = 'Brasil';
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Erro ao buscar CEP:', error);
        alert('Erro ao buscar o CEP. Tente novamente mais tarde.');
        this.limparCamposEndereco();
      },
      complete: () => {
        this.buscandoCep = false;
        this.cdr.detectChanges();
      }
    });
  }

  private limparCamposEndereco(): void {
    this.condominio.logradouro = '';
    this.condominio.cidade = '';
    this.condominio.estado = '';
    this.buscandoCep = false;
    this.cdr.detectChanges();
  }

  aplicarMascaraCep(event: any): void {
    let cep = event.target.value.replace(/\D/g, '');
    if (cep.length > 5) {
      cep = cep.substring(0, 5) + '-' + cep.substring(5, 8);
    }
    this.condominio.cep = cep;
  }

  criarCondominio(condominio: CondominioRequest): Observable<CondominioResponse> {
    return this.http.post<CondominioResponse>(this.apiUrl, condominio, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    });
  }

  async salvarCondominio() {
    if (!this.condominio.cep || this.condominio.cep.replace(/\D/g, '').length !== 8) {
      alert('Por favor, preencha um CEP valido com 8 digitos.');
      return;
    }

    if (
      !this.condominio.nomeCondominio ||
      !this.condominio.pais ||
      !this.condominio.estado ||
      !this.condominio.cidade ||
      !this.condominio.logradouro ||
      !this.condominio.numeroCondominio ||
      !this.condominio.blocos ||
      !this.condominio.apartamentos
    ) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    this.criarCondominio(this.condominio).subscribe({
      next: async (res: CondominioResponse) => {
        const condominioCriado = res;
        const email = localStorage.getItem('email');
        const payload2 = { idCondominio: condominioCriado.id };

        const res2 = await fetch(`/api/usuarios/${email}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(payload2),
        });

        if (!res2.ok) {
          const errorText = await res2.text();
          console.error('Erro na atualizacao do usuario:', errorText);
        }

        const usuarioSalvo = localStorage.getItem('usuario');
        if (usuarioSalvo) {
          const usuarioAtualizado = JSON.parse(usuarioSalvo);
          usuarioAtualizado.condominio = condominioCriado;
          localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));
        }

        localStorage.setItem('condominio', condominioCriado.nomeCondominio);
        alert('Condominio criado com sucesso!');
        window.location.href = '/dashboard';
      },
      error: (err: any) => {
        console.error('Erro ao criar condominio', err);
        alert('Erro ao criar condominio. Verifique os dados e tente novamente.');
      }
    });
  }
}
