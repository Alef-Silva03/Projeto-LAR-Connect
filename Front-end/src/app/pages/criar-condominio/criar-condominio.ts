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
    pais: 'Brasil', // Valor padrão
    estado: '',
    cidade: '',
    logradouro: '',
    numeroCondominio: 0,
    blocos: 0,
    apartamentos: 0,
  };

  private apiUrl = 'http://localhost:8080/sindico/api/condominio/create';
  
  // Flag para controlar loading durante a busca do CEP
  buscandoCep: boolean = false;

  constructor(
    private http: HttpClient, 
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  /**
   * Busca endereço pelo CEP usando a API ViaCEP
   * @param cep - CEP digitado pelo usuário (com ou sem máscara)
   */
  buscarCep(cep: string): void {
    // Remove caracteres não numéricos
    const cepNumerico = cep.replace(/\D/g, '');
    
    // Verifica se o CEP tem 8 dígitos
    if (cepNumerico.length !== 8) {
      return;
    }

    this.buscandoCep = true;

    this.http.get<any>(`https://viacep.com.br/ws/${cepNumerico}/json/`).subscribe({
      next: (data) => {
        if (data.erro) {
          alert('CEP não encontrado. Por favor, verifique o número digitado.');
          this.limparCamposEndereco();
          return;
        }

        // Preenche os campos com os dados retornados
        this.condominio.logradouro = data.logradouro || '';
        this.condominio.cidade = data.localidade || '';
        this.condominio.estado = data.uf || '';
        this.condominio.pais = 'Brasil'; // ViaCEP não retorna país, então setamos como padrão
        
        // Opcional: Se quiser preencher o bairro também (se tiver campo)
        // this.condominio.bairro = data.bairro || '';

        // Força a detecção de mudanças para atualizar a view
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

  /**
   * Limpa os campos de endereço quando o CEP não é encontrado
   */
  private limparCamposEndereco(): void {
    this.condominio.logradouro = '';
    this.condominio.cidade = '';
    this.condominio.estado = '';
    this.buscandoCep = false;
    this.cdr.detectChanges();
  }

  /**
   * Aplica máscara ao CEP (formato 99999-999)
   * @param event - Evento do input
   */
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
    // Validação básica antes de enviar
    if (!this.condominio.cep || this.condominio.cep.replace(/\D/g, '').length !== 8) {
      alert('Por favor, preencha um CEP válido com 8 dígitos.');
      return;
    }

    this.criarCondominio(this.condominio).subscribe({
      next: async (res: CondominioResponse) => {
        const condominioCriado = res;
        const email = localStorage.getItem("email");

        const payload2 = { idCondominio: condominioCriado.id };

        const res2 = await fetch(`/api/usuarios/${email}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: 'include',
          body: JSON.stringify(payload2),
        });

        if (!res2.ok) {
          const errorText = await res2.text();
          console.error("Erro na atualização do usuário:", errorText);
        }

        localStorage.setItem("condominio", condominioCriado.nomeCondominio);
        alert("Condomínio criado com sucesso!");
        window.location.href = "/dashboard";
      },
      error: (err: any) => {
        console.error('Erro ao criar condomínio', err);
        alert('Erro ao criar condomínio. Verifique os dados e tente novamente.');
      }
    });
  }
}