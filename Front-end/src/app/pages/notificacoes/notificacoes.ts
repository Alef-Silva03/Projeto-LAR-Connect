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
  encomendas: any[] = [];
  historico: any[] = [];

  private readonly API_URL = 'http://localhost:8080/api/portaria';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cdr.detectChanges();
    this.carregarEntregasAtivas();

  }
  getUsuarioNome(): number {
    // Aqui você pode implementar a lógica para obter o ID do usuário logado
    // Por exemplo, se você armazenar o ID no localStorage após o login:
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    console.log('ID do usuário logado:', usuario.nome); // Verifique se o ID está sendo recuperado corretamente
    return usuario.nome || 0; // Retorna 0 se não encontrar o ID
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
    this.http.get<any[]>(`${this.API_URL}/encomendas-pendentes`)
      .subscribe(dados => this.encomendas = dados);
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

  // ESSA É A FUNÇÃO QUE ESTAVA FALTANDO:
  confirmarRecebimento(id: number) {
    // Chama o PatchMapping do seu PortariaController no Java
    this.http.patch(`${this.API_URL}/entregar/${id}`, {})
      .subscribe(() => {
        // Após confirmar no MySQL, recarrega a lista para sumir da tela
        this.carregarEntregasAtivas();
        console.log(`Encomenda ${id} entregue com sucesso!`);
      });
  }
}