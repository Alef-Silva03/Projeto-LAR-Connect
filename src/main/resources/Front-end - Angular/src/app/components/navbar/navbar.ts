import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  menuAberto = false; // O menu nasce escondido

  constructor(private router: Router) {}

  toggleMenu() {
    this.menuAberto = !this.menuAberto; // Alterna entre aberto e fechado
  }

  logout() {
    this.menuAberto = false;
    localStorage.removeItem('perfil'); // Limpa os dados de login
    this.router.navigate(['/login']); // Redireciona
  }
}