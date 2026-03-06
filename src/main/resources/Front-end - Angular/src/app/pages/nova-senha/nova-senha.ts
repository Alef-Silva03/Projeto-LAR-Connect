// src/app/pages/nova-senha/nova-senha.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PasswordResetService } from '../../services/password-reset.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-nova-senha',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './nova-senha.html',
  styleUrls: ['./nova-senha.css']
})
export class NovaSenhaComponent implements OnInit {
  novaSenhaForm: FormGroup;
  isLoading = false;
  mensagem = '';
  sucesso = false;
  tokenValido = true;
  token: string | null = null;
  validandoToken = false;

  constructor(
    private fb: FormBuilder,
    private passwordResetService: PasswordResetService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.novaSenhaForm = this.fb.group({
      novaSenha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required],
      token: ['']
    }, { validators: this.senhasCoincidem });
  }

  ngOnInit() {
    // Pegar o token da URL
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      
      if (!this.token) {
        this.tokenValido = false;
        this.mensagem = 'Token não encontrado. Solicite uma nova redefinição.';
      } else {
        this.novaSenhaForm.patchValue({
          token: this.token
        });
        // Opcional: validar o token com o backend
        this.validarToken();
      }
    });
  }

  validarToken() {
    if (!this.token) return;
    
    this.validandoToken = true;
    this.passwordResetService.validarToken(this.token).subscribe({
      next: (response) => {
        this.tokenValido = true;
        this.validandoToken = false;
      },
      error: (error) => {
        this.tokenValido = false;
        this.validandoToken = false;
        this.mensagem = error.error?.mensagem || 'Token inválido ou expirado. Solicite uma nova redefinição.';
        console.error('Erro ao validar token:', error);
      }
    });
  }

  senhasCoincidem(group: FormGroup) {
    const senha = group.get('novaSenha')?.value;
    const confirmar = group.get('confirmarSenha')?.value;
    return senha === confirmar ? null : { senhasDiferentes: true };
  }

  onSubmit() {
    if (this.novaSenhaForm.invalid || !this.tokenValido) {
      return;
    }

    this.isLoading = true;
    this.mensagem = '';

    // Usando o método redefinirSenha do serviço
    this.passwordResetService.redefinirSenha(this.novaSenhaForm.value)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.sucesso = true;
          this.mensagem = 'Senha alterada com sucesso!';
          
          // Redireciona para o login após 3 segundos
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error: (error) => {
          this.isLoading = false;
          this.sucesso = false;
          this.mensagem = error.error?.mensagem || 'Erro ao alterar senha. Tente novamente.';
          console.error('Erro:', error);
        }
      });
  }

  voltarParaLogin() {
    this.router.navigate(['/login']);
  }
}