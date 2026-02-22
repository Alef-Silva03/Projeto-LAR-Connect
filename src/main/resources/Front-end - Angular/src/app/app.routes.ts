import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { MinhaConta } from './pages/minha-conta/minha-conta';
import { Chat } from './pages/chat/chat';
import { Notificacoes } from './pages/notificacoes/notificacoes';
import { vagagaragem } from './pages/vaga-garagem/vaga-garagem'; 
import { DashboardSindico } from './pages/sindico/dashboard-sindico/dashboard-sindico';
import { EnviarComunicados } from './pages/sindico/enviar-comunicados/enviar-comunicados';
import { PainelMoradores } from './pages/sindico/painel-moradores/painel-moradores';
import { CriarCondominio } from './pages/sindico/criar-condominio/criar-condominio';
import { ReservaEspacos } from './pages/sindico/reserva-espacos/reserva-espacos';
import { CriarEnquete } from './pages/sindico/criar-enquete/criar-enquete';
import { AnunciosImoveis } from './pages/sindico/anuncios-imoveis/anuncios-imoveis';
import { EnviarMensagens } from './pages/sindico/enviar-mensagens/enviar-mensagens';
import { CaixaEntrada } from './pages/sindico/caixa-entrada/caixa-entrada';
import { DashboardFuncionario } from './pages/funcionario/dashboard-funcionario/dashboard-funcionario';
import { GestaoEncomendas } from './pages/funcionario/gestao-encomendas/gestao-encomendas';

export const routes: Routes = [
  // Rotas Públicas
  { path: '', component: Home },
  { path: 'login', component: Login },
  
  { path: 'cadastro', component: Cadastro },
  
  // Rotas de Usuário (Acesso Livre por enquanto)
  { path: 'minha-conta', component: MinhaConta },
  { path: 'chat', component: Chat },
  { path: 'notificacoes', component: Notificacoes },
  { path: 'notificacoes-entrega', component: Notificacoes },
  
  // Rota da Garagem (Movida para cima do redirecionamento final)
  { path: 'vaga-garagem', component: vagagaragem },
  { path: 'dashboard-sindico', component: DashboardSindico },
  // Rotas de Funcionalidades Administrativas
  { path: 'enviar-comunicados', component: EnviarComunicados },
  { path: 'painel-moradores', component: PainelMoradores },
  { path: 'criar-condominio', component: CriarCondominio },
  { path: 'reserva-espacos', component: ReservaEspacos },
  { path: 'criar-enquete', component: CriarEnquete },
  { path: 'anuncios-imoveis', component: AnunciosImoveis },
  { path: 'enviar-mensagens', component: EnviarMensagens },
  { path: 'caixa-entrada', component: CaixaEntrada },
  
  { path: 'dashboard-funcionario', component: DashboardFuncionario },
  { path: 'gestao-encomendas', component: GestaoEncomendas },

  // Redirecionamento Final (DEVE SER A ÚLTIMA LINHA)
  { path: '**', redirectTo: '' }
];

  /*-------- Rotas Protegidas (Exigem o perfil no localStorage via AuthGuard)
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
    path: 'notificacoes', 
    component: Notificacoes, 
    canActivate: [authGuard] 
  },

  // Redirecionamento para rotas inexistentes (Sempre por último)
  { path: '**', redirectTo: '' } ---*/