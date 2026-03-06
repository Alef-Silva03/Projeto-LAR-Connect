// src/app/pages/nova-senha/nova-senha.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Removi AbstractControl, ValidationErrors se não usados
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PasswordResetService } from '../../services/password-reset.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nova-senha',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './nova-senha.html',
  styleUrls: ['./nova-senha.css']
})
export class NovaSenhaComponent implements OnInit, OnDestroy {
  novaSenhaForm: FormGroup;
  isLoading = false;
  // ALTERAÇÃO 1: Adicionar propriedade 'mensagem' (seu template usa isso)
  mensagem = '';
  mensagemSucesso = '';
  mensagemErro = '';
  sucesso = false;
  tokenValido = true;
  token: string | null = null;
  validandoToken = false;
  tokenExpirado = false;
  
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private passwordResetService: PasswordResetService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.novaSenhaForm = this.fb.group({
      novaSenha: ['', [
        Validators.required, 
        Validators.minLength(6) // Simplifiquei a validação para combinar com seu template
      ]],
      confirmarSenha: ['', Validators.required],
      token: ['']
    }, { validators: this.senhasCoincidem });
  }

  ngOnInit() {
    this.verificarTokenNaUrl();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private verificarTokenNaUrl() {
    const querySub = this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      
      if (!this.token) {
        this.tokenValido = false;
        // ALTERAÇÃO 2: Atualizar 'mensagem' junto com 'mensagemErro'
        this.mensagemErro = 'Token não encontrado na URL. Solicite uma nova redefinição de senha.';
        this.mensagem = this.mensagemErro;
      } else {
        this.novaSenhaForm.patchValue({
          token: this.token
        });
        this.validarToken();
      }
    });

    this.subscriptions.push(querySub);
  }

  validarToken() {
    if (!this.token) return;
    
    this.validandoToken = true;
    this.limparMensagens();

    const validarSub = this.passwordResetService.validarToken(this.token).subscribe({
      next: (response: any) => {
        this.tokenValido = true;
        this.tokenExpirado = false;
        this.validandoToken = false;
        
        if (response && response.mensagem) {
          this.mensagemSucesso = response.mensagem;
          this.mensagem = this.mensagemSucesso;
        }
      },
      error: (error: any) => {
        this.tokenValido = false;
        this.validandoToken = false;
        
        if (error.status === 410) {
          this.tokenExpirado = true;
          this.mensagemErro = 'Token expirado. Solicite uma nova redefinição de senha.';
        } else if (error.status === 404) {
          this.mensagemErro = 'Token inválido ou não encontrado.';
        } else {
          this.mensagemErro = error.error?.mensagem || 'Erro ao validar token. Tente novamente.';
        }
        
        // ALTERAÇÃO 3: Sincronizar mensagem
        this.mensagem = this.mensagemErro;
        
        console.error('Erro ao validar token:', error);
      }
    });

    this.subscriptions.push(validarSub);
  }

  senhasCoincidem(group: FormGroup) {
    const senha = group.get('novaSenha')?.value;
    const confirmar = group.get('confirmarSenha')?.value;
    
    if (senha && confirmar && senha !== confirmar) {
      group.get('confirmarSenha')?.setErrors({ senhasDiferentes: true });
      return { senhasDiferentes: true };
    }
    
    return null;
  }

  onSubmit() {
    if (this.novaSenhaForm.invalid) {
      this.marcarCamposComoTocados();
      return;
    }

    if (!this.tokenValido || !this.token) {
      this.mensagemErro = 'Token inválido. Solicite uma nova redefinição de senha.';
      this.mensagem = this.mensagemErro;
      return;
    }

    this.isLoading = true;
    this.limparMensagens();

    const dadosRedefinicao = {
      token: this.token,
      novaSenha: this.novaSenhaForm.get('novaSenha')?.value
    };

    const redefinirSub = this.passwordResetService.redefinirSenha(dadosRedefinicao).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.sucesso = true;
        
        if (response && response.mensagem) {
          this.mensagemSucesso = response.mensagem;
        } else {
          this.mensagemSucesso = 'Senha alterada com sucesso! Redirecionando para o login...';
        }
        
        // ALTERAÇÃO 4: Sincronizar mensagem
        this.mensagem = this.mensagemSucesso;
        
        this.novaSenhaForm.reset();
        
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (error: any) => {
        this.isLoading = false;
        this.sucesso = false;
        
        if (error.status === 403) {
          this.mensagemErro = 'Token inválido ou expirado. Solicite uma nova redefinição.';
          this.tokenValido = false;
        } else if (error.status === 400) {
          this.mensagemErro = error.error?.mensagem || 'Dados inválidos. Verifique a senha informada.';
        } else {
          this.mensagemErro = error.error?.mensagem || 'Erro ao alterar senha. Tente novamente.';
        }
        
        // ALTERAÇÃO 5: Sincronizar mensagem
        this.mensagem = this.mensagemErro;
        
        console.error('Erro ao redefinir senha:', error);
      }
    });

    this.subscriptions.push(redefinirSub);
  }

  private marcarCamposComoTocados() {
    Object.keys(this.novaSenhaForm.controls).forEach(key => {
      const control = this.novaSenhaForm.get(key);
      control?.markAsTouched();
    });
  }

  private limparMensagens() {
    this.mensagem = '';
    this.mensagemSucesso = '';
    this.mensagemErro = '';
  }

  // Getters para o template
  get novaSenha() {
    return this.novaSenhaForm.get('novaSenha');
  }

  get confirmarSenha() {
    return this.novaSenhaForm.get('confirmarSenha');
  }

  // Navegação
  voltarParaLogin() {
    this.router.navigate(['/login']);
  }

  solicitarNovoToken() {
    this.router.navigate(['/redefinir-senha']);
  }
}