import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const RoleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const perfil = localStorage.getItem('perfil');
  const requiredRole = route.data['role'];
  
  if (perfil === requiredRole) {
    return true;
  }
  
  router.navigate(['/dashboard']);
  return false;
};