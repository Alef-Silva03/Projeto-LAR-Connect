import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Enquete } from '../../models/enquete.model';
import { CriarEnquete as CriarEnqueteService } from '../../services/criar-enquete';

@Component({
  selector: 'app-criar-enquete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './criar-enquete.html',
      styleUrls: ['./criar-enquete.css']
    })
  export class CriarEnquete implements OnInit {
  enquete = {
    titulo: '',
    opcao1: '',
    opcao2: '',
    votosOpcao1: 0,
    votosOpcao2: 0,
    ativo: true,
    idCondominio: 0,
    votoSelecionado: '',
  };

enquetes: Enquete[] = [];

  constructor(
    private enqueteService: CriarEnqueteService,
    private cdr: ChangeDetectorRef,
    public authService: AuthService,
  ) {}
  
  ngOnInit(): void {
    this.cdr.detectChanges();
    this.carregarEnquetes();
    this.cdr.detectChanges();
  }

  criarEnquete(): void {
    const usuarioString = localStorage.getItem('usuario');
    if (!usuarioString) {
      alert('Usuário não encontrado. Faça login novamente.');
      return;
    }
    const usuario = JSON.parse(usuarioString);
    this.enquete.idCondominio = usuario.condominio?.id;

    if (!this.enquete.titulo || !this.enquete.opcao1 || !this.enquete.opcao2) {
        alert('Por favor, preencha todos os campos.');
        return;
      }

    this.enqueteService.criarEnquete(this.enquete).subscribe({
      next: () => {
        alert('Enquete postada com sucesso!');
        this.enquete = { titulo: '', opcao1: '', opcao2: '', votosOpcao1: 0, votosOpcao2: 0, ativo: true, idCondominio: this.enquete.idCondominio, votoSelecionado: '' }; // limpa formulário
        this.carregarEnquetes(); // atualiza a lista
      },
      error: (err: any) => {
        console.error('Erro ao enviar enquete', err);
        alert('Erro ao postar enquete. Verifique o console.');
      }
    });
  }

  carregarEnquetes(): void {
    this.enqueteService.listarEnquetes().subscribe({
      next: (lista: Enquete[]) => {
        this.enquetes = lista;
        this.cdr.detectChanges();   // <-- força a atualização da view
      },
      error: (err: any) => console.error('Erro ao carregar enquetes', err)
    });
  }

  atualizarEnquete(id: any) {
    const enquete = this.enquetes.find(e => e.id === id);
    if (!enquete) {
      alert('Enquete não encontrada');
      return;
    }
    enquete.ativo = false; // desativa a enquete
    this.enqueteService.atualizarEnquete(enquete).subscribe({
      next: () => {
        alert('Enquete desativada com sucesso!');
        this.carregarEnquetes(); // atualiza a lista
      },
      error: (err: any) => {
        console.error('Erro ao desativar enquete', err);
        alert('Erro ao desativar enquete. Verifique o console.');
      }
    });
  }

  registrarVoto(enquete: Enquete, opcao?: string): void {
    enquete.votoSelecionado = opcao;
    enquete.votosOpcao1 = opcao === 'opcao1' ? (enquete.votosOpcao1 || 0) + 1 : enquete.votosOpcao1 || 0;
    enquete.votosOpcao2 = opcao === 'opcao2' ? (enquete.votosOpcao2 || 0) + 1 : enquete.votosOpcao2 || 0;
    console.log(enquete.titulo);
    this.enqueteService.atualizarEnquete(enquete).subscribe({
      next: () => {
        alert('Voto registrado com sucesso!');
        this.carregarEnquetes(); // atualiza a lista
      },
      error: (err: any) => {
        console.error('Erro ao registrar voto', err);
        alert('Erro ao registrar voto. Verifique o console.');
      }
    });
  }
}