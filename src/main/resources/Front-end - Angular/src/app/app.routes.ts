import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { MinhaConta } from './pages/minha-conta/minha-conta';
import { Chat } from './pages/chat/chat';
import { Notificacoes } from './pages/notificacoes/notificacoes';
import { VagaGaragem } from './pages/vaga-garagem/vaga-garagem';
import { Dashboard } from './pages/dashboard/dashboard';
import { EnviarComunicados } from './pages/enviar-comunicados/enviar-comunicados';
import { PainelMoradores } from './pages/painel-moradores/painel-moradores';
import { PainelFuncionarios } from './pages/painel-funcionarios/painel-funcionarios';
import { CriarCondominio } from './pages/criar-condominio/criar-condominio';
import { ReservaEspacos } from './pages/reserva-espacos/reserva-espacos';
import { CriarEnquete } from './pages/criar-enquete/criar-enquete';
import { AnunciosImoveis } from './pages/anuncios-imoveis/anuncios-imoveis';
import { EnviarMensagens } from './pages/enviar-mensagens/enviar-mensagens';
import { CaixaEntrada } from './pages/caixa-entrada/caixa-entrada';
import { DashboardFuncionario } from './pages/funcionario/dashboard-funcionario/dashboard-funcionario';
import { LocalGestaoEncomendasComponent as GestaoEncomendas } from './pages/funcionario/gestao-encomendas/gestao-encomendas';
import { MensagemAoSindico } from './pages/mensagem-ao-sindico/mensagem-ao-sindico';
import { DadosCondominio } from './pages/dados-condominio/dados-condominio';
import { RedefinirSenhaComponent } from './pages/redefinir-senha/redefinir-senha';
import { NovaSenhaComponent } from './pages/nova-senha/nova-senha';

// Guards
import { authGuard } from './guards/auth-guard';
import { RoleGuard } from './guards/role-guard';


export const routes: Routes = [
  // Rotas Públicas (sem proteção)
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'cadastro', component: Cadastro },
  { path: 'redefinir-senha', component: RedefinirSenhaComponent },
  { path: 'nova-senha', component: NovaSenhaComponent },
  { path: 'criar-condominio', component: CriarCondominio },


  // Rotas Protegidas (qualquer usuário logado)
  {
    path: 'minha-conta',
    component: MinhaConta,
    canActivate: [authGuard]
  },
  {
    path: 'chat',
    component: Chat,
    canActivate: [authGuard]
  },
  {
    path: 'notificacoes-entrega',
    component: Notificacoes,
    canActivate: [authGuard]
  },
  {
    path: 'vaga-garagem',
    component: VagaGaragem,
    canActivate: [authGuard]
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
  },
  {
    path: 'mensagem-ao-sindico',
    component: MensagemAoSindico,
    canActivate: [authGuard],
  },
  {
    path: 'caixa-entrada',
    component: CaixaEntrada,
    canActivate: [authGuard],
  },
    { 
    path: 'dados-condominio', 
    component: DadosCondominio, 
    canActivate: [authGuard],  
  },
  {
    path: 'enviar-comunicados',
    component: EnviarComunicados,
    canActivate: [authGuard],
  },
  // Rotas do Síndico (protegidas por role)


  {
    path: 'painel-moradores',
    component: PainelMoradores,
    canActivate: [authGuard, RoleGuard],
    data: { role: 'SINDICO' }
  },
  {
    path: 'painel-funcionarios',
    component: PainelFuncionarios,
    canActivate: [authGuard, RoleGuard],
    data: { role: 'SINDICO' }
  },

  {
    path: 'reserva-espacos',
    component: ReservaEspacos,
    canActivate: [authGuard, RoleGuard],
    data: { role: 'SINDICO' }
  },
  {
    path: 'criar-enquete',
    component: CriarEnquete,
    canActivate: [authGuard, RoleGuard],
    data: { role: 'SINDICO' }
  },
  {
    path: 'anuncios-imoveis',
    component: AnunciosImoveis,
    canActivate: [authGuard, RoleGuard],
    data: { role: 'SINDICO' }
  },
  {
    path: 'enviar-mensagens',
    component: EnviarMensagens,
    canActivate: [authGuard, RoleGuard],
    data: { role: 'SINDICO' }
  },


  // Rotas do Funcionário (protegidas por role)
  {
    path: 'dashboard-funcionario',
    component: DashboardFuncionario,
    canActivate: [authGuard, RoleGuard],
    data: { role: 'FUNCIONARIO' }
  },
  {
    path: 'gestao-encomendas',
    component: GestaoEncomendas,
    canActivate: [authGuard, RoleGuard],
    data: { role: 'FUNCIONARIO' }
  },

  // Redirecionamento Final (DEVE SER A ÚLTIMA LINHA)
  { path: '**', redirectTo: '' }
];