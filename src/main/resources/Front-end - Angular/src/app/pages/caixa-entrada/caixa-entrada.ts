import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagemPrivadaService } from '../../services/mensagem-privada';
import { MensagemPrivada } from '../../models/mensagemPrivada.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-caixa-entrada',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './caixa-entrada.html',
  styleUrls: ['./caixa-entrada.css']
})

export class CaixaEntrada implements OnInit {

  mensagens: MensagemPrivada[] = [];

  constructor(
    private mensagemPrivadaService: MensagemPrivadaService,
    private cdr: ChangeDetectorRef,
    public authService: AuthService,
  ) {};

    ngOnInit(): void {
    this.cdr.detectChanges();
    this.carregarMensagens();
  };

    carregarMensagens(): void {
    this.mensagemPrivadaService.listarMensagens().subscribe({
      next: (lista) => {
        this.mensagens = lista;
        this.cdr.detectChanges();   // <-- força a atualização da view
      },
      error: (err) => console.error('Erro ao carregar comunicados', err)
    });
  };

    excluirMensagem(id: any) {
    if (confirm('Tem certeza de que deseja excluir esta Mensagem?')) {
      this.mensagemPrivadaService.excluirMensagem(id).subscribe({
        next: () => {
          this.mensagens = this.mensagens.filter(mensagem => mensagem.id !== id);
          this.cdr.detectChanges();
        },
        error: () => {
          alert('Erro no processo de exclusão');
        }
      });
    };
  };
};