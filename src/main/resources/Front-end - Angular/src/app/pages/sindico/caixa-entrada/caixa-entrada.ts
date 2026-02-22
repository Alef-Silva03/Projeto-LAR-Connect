import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-caixa-entrada',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './caixa-entrada.html',
  styleUrls: ['./caixa-entrada.css']
})
export class CaixaEntrada {
  mensagens = [
    {
      morador: 'Alef Silva',
      apto: '1320',
      assunto: 'Vazamento na Garagem',
      preview: 'Gostaria de informar que há um vazamento constante de água na vaga 45...',
      data: 'Hoje, 14:30',
      prioridade: 'Urgente',
      lida: false
    },
    {
      morador: 'Patrícia Stampa',
      apto: '402',
      assunto: 'Sugestão para o Playground',
      preview: 'Poderíamos colocar mais bancos na área das crianças para os pais...',
      data: 'Ontem',
      prioridade: 'Normal',
      lida: true
    },
    {
      morador: 'Yuri Mendes',
      apto: '101',
      assunto: 'Barulho Excessivo',
      preview: 'O vizinho do 102 está com música alta desde as 22h de ontem...',
      data: '20 Fev',
      prioridade: 'Urgente',
      lida: false
    }
  ];

  abrirMensagem(msg: any) {
    msg.lida = true;
    console.log('Abrindo conversa com:', msg.morador);
    // Aqui você poderia abrir um modal ou navegar para o chat
  }
}