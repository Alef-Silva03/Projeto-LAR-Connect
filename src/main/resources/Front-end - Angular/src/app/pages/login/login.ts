import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  constructor(private router: Router) {}

  // Futura lógica de autenticação com seu backend Spring Boot
  fazerLogin() {
    console.log('Tentando logar...');
    // Após sucesso: this.router.navigate(['/']);
  }
}