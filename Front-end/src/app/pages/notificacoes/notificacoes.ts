import { ChangeDetectorRef,Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-notificacoes',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './notificacoes.html',
  styleUrls: ['./notificacoes.css']
})
export class Notificacoes implements OnInit {
  abaAtiva: string = 'entregas';
  encomendas$: any;
  historico: any[] = [];
  console = console

  private readonly API_URL = 'http://localhost:8080/api/portaria';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cdr.detectChanges();
    this.encomendas$ = this.carregarEntregasAtivas();
    this.console.log(this.encomendas$)
  }

  getUsuarioNome(): number {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    console.log('ID do usuário logado:', usuario.nome); 
    return usuario.nome || 0; 
  }

  setAba(nomeAba: string) {
    this.abaAtiva = nomeAba;
    if (nomeAba === 'historico') {
      this.cdr.detectChanges();
      this.carregarHistorico();
    } else {
      this.cdr.detectChanges();
      this.carregarEntregasAtivas();
    }
  }

  carregarEntregasAtivas() {
    this.cdr.detectChanges();
    return this.http.get<any[]>(`${this.API_URL}/encomendas-pendentes`)
  }

  carregarHistorico() {
    this.cdr.detectChanges();
    this.http.get<any[]>(`${this.API_URL}/historico`)
      .subscribe(dados => {
        this.historico = dados.map(e => ({
          data: new Date(e.dataEntrega).toLocaleDateString('pt-BR'),
          descricao: e.descricao,
          morador: e.morador,
          entreguePor: 'Portaria Central'
        }));
      });
  }

  confirmarRecebimento(id: number) {
    this.http.patch(`${this.API_URL}/entregar/${id}`, {})
      .subscribe(() => {
        this.carregarEntregasAtivas();
        console.log(`Encomenda ${id} entregue com sucesso!`);
      });
  }
}