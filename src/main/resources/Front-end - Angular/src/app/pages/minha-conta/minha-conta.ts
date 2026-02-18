import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';        

@Component({
  selector: 'app-minha-conta',
  standalone: true, // Importante se for standalone
  imports: [CommonModule],
  templateUrl: './minha-conta.html',
  styleUrl: './minha-conta.css',
})
export class MinhaConta {
logout() {
throw new Error('Method not implemented.');
}

}
