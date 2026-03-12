import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const RoleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const perfil = localStorage.getItem('perfil');
  const requiredRole = route.data['role'];
  const token = localStorage.getItem('token');
  
  // Verifica se está logado primeiro
  if (!token) {
    router.navigate(['/login']);
    return false;
  }
  
  // Se não tem perfil ou não tem o perfil necessário
  if (!perfil || perfil !== requiredRole) {
    // Redireciona baseado no perfil que tem
    switch(perfil) {
      case 'SINDICO':
        router.navigate(['/dashboard-sindico']);
        break;
      case 'FUNCIONARIO':
        router.navigate(['/dashboard-funcionario']);
        break;
      case 'PROPRIETARIO':
      case 'INQUILINO':
        router.navigate(['/minha-conta']);
        break;
      default:
        router.navigate(['/']);
    }
    return false;
  }
  
  return true;
};