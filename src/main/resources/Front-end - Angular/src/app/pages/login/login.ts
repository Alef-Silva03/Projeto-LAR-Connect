import { AuthService } from './../../services/auth';  
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Adicione nos imports

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  
  dadosLogin = { login: '', senha: '' };

constructor(private authService: AuthService, private router: Router) {}

fazerLogin() {
  this.authService.login(this.dadosLogin).subscribe({
  next: (usuarioLogado) => {
    alert(`Bem-vindo, ${usuarioLogado.nome}!`);
    localStorage.setItem('usuario', JSON.stringify(usuarioLogado));

    // Redirecionamento baseado no perfil que vem do banco
    if (usuarioLogado.perfil === 'SINDICO') {
      this.router.navigate(['/dashboard-sindico']);
    } else if (usuarioLogado.perfil === 'FUNCIONARIO') {
      this.router.navigate(['/dashboard-funcionario']);
    } else {
      this.router.navigate(['/home-morador']);
    }
  },
  error: (err) => {
    alert('Email ou senha incorretos.');
  }
});
}     
}
