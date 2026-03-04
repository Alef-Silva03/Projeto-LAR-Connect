// src/app/pages/nova-senha/nova-senha.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordResetService } from '../../services/password-reset.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-nova-senha',
  standalone: true, // Importante: marcar como standalone
  imports: [CommonModule, ReactiveFormsModule], // Importar os módulos necessários
  templateUrl: './nova-senha.html',
  styleUrls: ['./nova-senha.css']
})
export class NovaSenhaComponent implements OnInit {
  novaSenhaForm: FormGroup;
  isLoading = false;
  mensagem = '';
  sucesso = false;
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private passwordResetService: PasswordResetService
  ) {
    this.novaSenhaForm = this.fb.group({
      token: ['', Validators.required],
      novaSenha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required]
    }, { validators: this.senhasIguais });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (this.token) {
        this.novaSenhaForm.patchValue({ token: this.token });
      } else {
        this.mensagem = 'Token não encontrado. Solicite uma nova redefinição.';
      }
    });
  }

  senhasIguais(group: AbstractControl): ValidationErrors | null {
    const novaSenha = group.get('novaSenha')?.value;
    const confirmarSenha = group.get('confirmarSenha')?.value;
    
    if (novaSenha && confirmarSenha && novaSenha !== confirmarSenha) {
      return { senhasDiferentes: true };
    }
    return null;
  }

  onSubmit() {
    if (this.novaSenhaForm.valid && this.token) {
      this.isLoading = true;
      this.mensagem = '';

      this.passwordResetService.salvarNovaSenha(
        this.token,
        this.novaSenhaForm.value.novaSenha,
        this.novaSenhaForm.value.confirmarSenha
      ).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.sucesso = true;
          this.mensagem = 'Senha alterada com sucesso!';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (error) => {
          this.isLoading = false;
          this.sucesso = false;
          if (error.error === 'senhas_diferentes') {
            this.mensagem = 'As senhas não coincidem.';
          } else if (error.error?.includes('expirado')) {
            this.mensagem = 'Token expirado. Solicite uma nova redefinição.';
          } else {
            this.mensagem = 'Erro ao redefinir senha. Tente novamente.';
          }
          console.error('Erro:', error);
        }
      });
    }
  }

  voltarParaLogin() {
    this.router.navigate(['/login']);
  }
}