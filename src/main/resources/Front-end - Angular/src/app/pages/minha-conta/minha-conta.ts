import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CpfPipe } from './cpf.pipe';

@Component({
  selector: 'app-minha-conta',
  standalone: true,
  imports: [CommonModule, FormsModule, CpfPipe],
  templateUrl: './minha-conta.html',
  styleUrls: ['./minha-conta.css']
})
export class MinhaConta {
  // Controle de aba ativa
  abaAtiva: string = 'dados-pessoais';

  // Dados do usuário
  dadosUsuario = {
    nome: localStorage.getItem('nome') || 'Usuário',
    email: localStorage.getItem('email') || 'usuario@email.com',
    cpf: localStorage.getItem('cpf') || '',
    cpfVerificado: localStorage.getItem('cpfVerificado') === 'true',
    apartamento: localStorage.getItem('apto') || '101',
    bloco: localStorage.getItem('bloco') || 'A',
    vaga: localStorage.getItem('vaga') || '05',
    telefone: localStorage.getItem('telefone') || '',
    ultimaAlteracaoSenha: localStorage.getItem('ultimaAlteracaoSenha') || '',
    twofaAtivado: localStorage.getItem('twofaAtivado') === 'true'
  };

  // Controle do modal de CPF
  mostrarModalCPF: boolean = false;
  cpfInput: string = '';
  cpfErro: string = '';

  // Dados de boletos
  boletos: any[] = [];

  // Dados de notificações
  notificacoes: any[] = [];
  filtroNotificacoes: string = 'todas';
  notificacoesFiltradas: any[] = [];

  constructor(private router: Router) {
    this.carregarBoletos();
    this.carregarNotificacoes();
    this.filtrarNotificacoes('todas');
  }

  // ===== MÉTODOS GERAIS =====
  mudarAba(aba: string) {
    this.abaAtiva = aba;
  }

  logout() {
    // Limpar dados de sessão se necessário
    // localStorage.clear();
    this.router.navigate(['/login']);
  }

  // ===== MÉTODOS DE EDIÇÃO =====
  editarCampo(campo: string) {
    switch(campo) {
      case 'nome':
        const novoNome = prompt('Digite seu novo nome:', this.dadosUsuario.nome);
        if (novoNome && novoNome.trim()) {
          this.dadosUsuario.nome = novoNome;
          localStorage.setItem('nome', novoNome);
        }
        break;
        
      case 'email':
        const novoEmail = prompt('Digite seu novo e-mail:', this.dadosUsuario.email);
        if (novoEmail && novoEmail.trim() && this.validarEmail(novoEmail)) {
          this.dadosUsuario.email = novoEmail;
          localStorage.setItem('email', novoEmail);
        } else {
          alert('E-mail inválido!');
        }
        break;
        
      case 'telefone':
        const novoTelefone = prompt('Digite seu novo telefone:', this.dadosUsuario.telefone);
        if (novoTelefone && novoTelefone.trim()) {
          this.dadosUsuario.telefone = novoTelefone;
          localStorage.setItem('telefone', novoTelefone);
        }
        break;
        
      case 'cpf':
        this.abrirModalCPF();
        break;
    }
  }

  validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // ===== MÉTODOS DE SEGURANÇA =====
  abrirModalCPF() {
    this.mostrarModalCPF = true;
    this.cpfInput = this.dadosUsuario.cpf || '';
    this.cpfErro = '';
  }

  fecharModalCPF(event?: any) {
    if (event && event.target.classList.contains('modal')) {
      this.mostrarModalCPF = false;
    } else if (!event) {
      this.mostrarModalCPF = false;
    }
  }

  formatarCPF(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      this.cpfInput = value;
    }
  }

  cpfValido(): boolean {
    const cpf = this.cpfInput.replace(/\D/g, '');
    
    if (cpf.length !== 11) {
      this.cpfErro = 'CPF deve ter 11 dígitos';
      return false;
    }
    
    // Validar se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cpf)) {
      this.cpfErro = 'CPF inválido';
      return false;
    }
    
    // Validar dígitos verificadores
    let soma = 0;
    let resto;
    
    for (let i = 1; i <= 9; i++) {
      soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) {
      this.cpfErro = 'CPF inválido';
      return false;
    }
    
    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) {
      this.cpfErro = 'CPF inválido';
      return false;
    }
    
    this.cpfErro = '';
    return true;
  }

  salvarCPF() {
    if (this.cpfValido()) {
      this.dadosUsuario.cpf = this.cpfInput;
      this.dadosUsuario.cpfVerificado = true;
      localStorage.setItem('cpf', this.cpfInput);
      localStorage.setItem('cpfVerificado', 'true');
      this.mostrarModalCPF = false;
      alert('CPF cadastrado com sucesso!');
    }
  }

  copiarCPF() {
    if (this.dadosUsuario.cpf) {
      navigator.clipboard.writeText(this.dadosUsuario.cpf).then(() => {
        alert('CPF copiado para a área de transferência!');
      });
    }
  }

  alterarSenha() {
    const senhaAtual = prompt('Digite sua senha atual:');
    if (senhaAtual) {
      // Aqui você validaria a senha atual com o backend
      const novaSenha = prompt('Digite sua nova senha:');
      if (novaSenha && novaSenha.length >= 6) {
        const confirmarSenha = prompt('Confirme sua nova senha:');
        if (novaSenha === confirmarSenha) {
          const dataAtual = new Date().toLocaleDateString('pt-BR');
          this.dadosUsuario.ultimaAlteracaoSenha = dataAtual;
          localStorage.setItem('ultimaAlteracaoSenha', dataAtual);
          alert('Senha alterada com sucesso!');
        } else {
          alert('As senhas não conferem!');
        }
      } else {
        alert('A senha deve ter no mínimo 6 caracteres!');
      }
    }
  }

  toggle2FA(event: any) {
    this.dadosUsuario.twofaAtivado = event.target.checked;
    localStorage.setItem('twofaAtivado', String(event.target.checked));
    
    if (event.target.checked) {
      alert('Configure a autenticação em duas etapas nas próximas etapas.');
      // Aqui você implementaria a configuração do 2FA
    }
  }

  // ===== MÉTODOS DE BOLETOS =====
  carregarBoletos() {
    // Dados mockados para exemplo
    this.boletos = [
      {
        id: 1,
        mes: 'Março/2024',
        valor: 450.00,
        vencimento: new Date(2024, 2, 10),
        pago: false,
        atrasado: true,
        codigoBarras: '12345.67890 12345.678901 12345.678901 1 123456789012',
        dataPagamento: null
      },
      {
        id: 2,
        mes: 'Abril/2024',
        valor: 450.00,
        vencimento: new Date(2024, 3, 10),
        pago: false,
        atrasado: false,
        codigoBarras: '12345.67890 12345.678901 12345.678901 2 123456789012',
        dataPagamento: null
      },
      {
        id: 3,
        mes: 'Maio/2024',
        valor: 450.00,
        vencimento: new Date(2024, 4, 10),
        pago: true,
        atrasado: false,
        codigoBarras: '12345.67890 12345.678901 12345.678901 3 123456789012',
        dataPagamento: new Date(2024, 4, 5)
      }
    ];
  }

  get totalEmAberto(): number {
    return this.boletos
      .filter(b => !b.pago)
      .reduce((total, b) => total + b.valor, 0);
  }

  get proximoVencimento(): Date | null {
    const naoPagos = this.boletos.filter(b => !b.pago);
    if (naoPagos.length === 0) return null;
    
    return naoPagos.reduce((menor, b) => 
      b.vencimento < menor.vencimento ? b : menor
    ).vencimento;
  }

  visualizarBoleto(boleto: any) {
    window.open(`/boletos/${boleto.id}`, '_blank');
  }

  baixarBoleto(boleto: any) {
    alert(`Download do boleto ${boleto.mes} iniciado!`);
    // Implementar download real
  }

  copiarCodigoBoleto(codigo: string) {
    navigator.clipboard.writeText(codigo).then(() => {
      alert('Código de barras copiado!');
    });
  }

  // ===== MÉTODOS DE NOTIFICAÇÕES =====
  carregarNotificacoes() {
    // Dados mockados para exemplo
    this.notificacoes = [
      {
        id: 1,
        tipo: 'aviso',
        titulo: 'Manutenção programada',
        mensagem: 'Neste sábado, dia 15/03, haverá manutenção na rede de água das 9h às 12h.',
        data: new Date(2024, 2, 10, 14, 30),
        lida: false,
        importante: true,
        anexo: 'cronograma.pdf'
      },
      {
        id: 2,
        tipo: 'evento',
        titulo: 'Festa do Condomínio',
        mensagem: 'No dia 20/03 teremos nossa confraternização mensal na área da piscina.',
        data: new Date(2024, 2, 9, 10, 15),
        lida: true,
        importante: false,
        anexo: null
      },
      {
        id: 3,
        tipo: 'alerta',
        titulo: 'Atenção com estranhos',
        mensagem: 'Houve relatos de pessoas suspeitas no bloco C. Fiquem atentos.',
        data: new Date(2024, 2, 8, 8, 45),
        lida: false,
        importante: true,
        anexo: null
      },
      {
        id: 4,
        tipo: 'mensagem',
        titulo: 'Assembleia Geral',
        mensagem: 'Convocamos todos para assembleia geral no dia 25/03 às 19h.',
        data: new Date(2024, 2, 7, 16, 20),
        lida: false,
        importante: false,
        anexo: 'pauta.pdf'
      },
      {
        id: 5,
        tipo: 'manutencao',
        titulo: 'Troca de lâmpadas',
        mensagem: 'Nesta semana faremos a troca das lâmpadas dos corredores.',
        data: new Date(2024, 2, 6, 11, 0),
        lida: true,
        importante: false,
        anexo: null
      }
    ];
  }

  get notificacoesNaoLidas(): number {
    return this.notificacoes.filter(n => !n.lida).length;
  }

  get notificacoesImportantes(): number {
    return this.notificacoes.filter(n => n.importante).length;
  }

  filtrarNotificacoes(filtro: string) {
    this.filtroNotificacoes = filtro;
    
    switch(filtro) {
      case 'todas':
        this.notificacoesFiltradas = [...this.notificacoes];
        break;
      case 'nao-lidas':
        this.notificacoesFiltradas = this.notificacoes.filter(n => !n.lida);
        break;
      case 'importantes':
        this.notificacoesFiltradas = this.notificacoes.filter(n => n.importante);
        break;
      default:
        this.notificacoesFiltradas = [...this.notificacoes];
    }
    
    // Ordenar por data (mais recentes primeiro)
    this.notificacoesFiltradas.sort((a, b) => b.data.getTime() - a.data.getTime());
  }

  abrirNotificacao(notificacao: any) {
    if (!notificacao.lida) {
      notificacao.lida = true;
      this.filtrarNotificacoes(this.filtroNotificacoes);
    }
    // Aqui você pode abrir um modal com detalhes da notificação
    alert(`Notificação: ${notificacao.titulo}\n\n${notificacao.mensagem}`);
  }

  marcarComoLida(notificacao: any) {
    notificacao.lida = true;
    this.filtrarNotificacoes(this.filtroNotificacoes);
  }

  toggleImportante(notificacao: any) {
    notificacao.importante = !notificacao.importante;
    this.filtrarNotificacoes(this.filtroNotificacoes);
  }

  marcarTodasComoLidas() {
    this.notificacoes.forEach(n => n.lida = true);
    this.filtrarNotificacoes(this.filtroNotificacoes);
    alert('Todas as notificações foram marcadas como lidas!');
  }
}