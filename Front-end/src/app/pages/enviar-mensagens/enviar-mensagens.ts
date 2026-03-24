import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagemPrivada } from '../../models/mensagemPrivada.model';
import { FormsModule } from '@angular/forms';
import { Morador, MoradoresService } from '../../services/moradores';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-enviar-mensagens',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enviar-mensagens.html',
  styleUrls: ['./enviar-mensagens.css']
})


export class EnviarMensagens implements OnInit {
  moradores$: any;
  console = console

  mensagemPrivada: MensagemPrivada = {
    tipo: 'MensagemAoMorador',
    titulo: '',
    assunto: '',
    texto: '',
    condominio: {
      id: 0,
      nomeCondominio: '',
      cep: '',
      pais: '',
      estado: '',
      cidade: '',
      logradouro: '',
      numeroCondominio: 0,
      blocos: 0,
      apartamentos: 0
    },
    idDestinatario: 0,
    arquivo: ''
  }

  constructor(
    private moradoresService: MoradoresService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cdr.detectChanges
    this.moradores$ = this.moradoresService.listarMoradores();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.mensagemPrivada.arquivo = file.name;
    }
  }

  enviarMensagem(){

  }
}