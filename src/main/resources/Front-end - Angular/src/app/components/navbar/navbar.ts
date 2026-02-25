import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  menuAberto = false;

  constructor(private router: Router, public authService: AuthService) {}

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  logout() {
    fetch("http://localhost:8080/api/auth/logout", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
    });
    localStorage.clear();
    this.menuAberto = false;
    this.router.navigate(['/']); 
    }
}