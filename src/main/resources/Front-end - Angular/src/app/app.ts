import { RouterOutlet, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { MinhaConta } from './pages/minha-conta/minha-conta';
import { Footer } from './components/footer/footer';
import { Navbar } from './components/navbar/navbar';
import { Component } from '@angular/core';
import { Chat } from './pages/chat/chat';
import { Notificacoes } from './pages/notificacoes/notificacoes';

export const routes: Routes = [
  { path: '', component: Home },
    { path: 'login', component: Login },
    { path: 'cadastro', component: Cadastro },
    { path: 'minha-conta', component: MinhaConta }, // Remova qualquer 'canActivate' daqui
    { path: 'chat', component: Chat },      // Acesso livre ao chat
    { path: 'notificacoes', component: Notificacoes },
    { path: '**', redirectTo: '' }
];
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer], // A Navbar PRECISA estar aqui
 // No seu arquivo app.ts
template: `
  <app-navbar></app-navbar>
  
  <main class="container-fluid p-0" style="margin-top: 85px;"> 
    <router-outlet></router-outlet>
  </main>

  <app-footer></app-footer>
`
})
export class App { }