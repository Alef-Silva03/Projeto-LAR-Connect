// src/app/pages/redefinir-senha/redefinir-senha.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PasswordResetService } from '../../services/password-reset.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-redefinir-senha',
  standalone: true, // Importante: marcar como standalone
  imports: [CommonModule, ReactiveFormsModule, RouterLink], // Importar os módulos necessários
  templateUrl: './redefinir-senha.html',
  styleUrls: ['./redefinir-senha.css']
})
export class RedefinirSenhaComponent {
  redefinirForm: FormGroup;
  isLoading = false;
  mensagem = '';

  constructor(
    private fb: FormBuilder,
    private passwordResetService: PasswordResetService,
    private router: Router
  ) {
    this.redefinirForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.redefinirForm.valid) {
      this.isLoading = true;
      this.mensagem = '';

      this.passwordResetService.solicitarReset(this.redefinirForm.value.email)
        .subscribe({
          next: (response) => {
            this.isLoading = false;
            this.router.navigate(['/nova-senha'], { 
              queryParams: { token: response.token }
            });
          },
          error: (error) => {
            this.isLoading = false;
            this.mensagem = 'Erro ao solicitar redefinição. Tente novamente.';
            console.error('Erro:', error);
          }
        });
    }
  }
}