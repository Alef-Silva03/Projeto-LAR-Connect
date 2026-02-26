import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';        
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-minha-conta',
  standalone: true, // Importante se for standalone
  imports: [CommonModule],
  templateUrl: './minha-conta.html',
  styleUrl: './minha-conta.css',
})
export class MinhaConta {
  constructor(
  public authService: AuthService
  ) {}
  nome = localStorage.getItem("nome")

}
