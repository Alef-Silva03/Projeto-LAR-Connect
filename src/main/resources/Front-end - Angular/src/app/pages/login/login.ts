import { AuthService } from '../../services/auth.service';
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
  this.authService.login(this.dadosLogin.login, this.dadosLogin.senha).subscribe({
  next: (usuarioLogado) => {
    localStorage.setItem('usuario', JSON.stringify(usuarioLogado));

    // Redirecionamento baseado no perfil que vem do banco
    if (usuarioLogado.perfil === 'SINDICO' && usuarioLogado.condominio == null){
      this.router.navigate(['/criar-condominio']);
    } else if (usuarioLogado.condominio === null) {
      this.router.navigate(['/dashboard']);
      alert(`Olá ${usuarioLogado.nome}! Lembre de pedir a seu síndico para te adicionar ao grupo do seu condomínio para que você possa usar todas as funcionalidades da plataforma!`)
    } else if (usuarioLogado.perfil === 'FUNCIONARIO'){
      this.router.navigate(['/dashboard-funcionario']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  },
  error: (err) => {
    alert('Email ou senha incorretos.');
  }
});
}     
}
