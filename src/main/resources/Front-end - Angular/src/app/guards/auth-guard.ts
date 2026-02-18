import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // Verifica se o perfil existe no localStorage (lógica do seu script.js)
  const perfil = localStorage.getItem('perfil');

  if (perfil) {
    return true; // Acesso liberado
  } else {
    // Se não estiver logado, redireciona para o login
    router.navigate(['/login']);
    return false; // Acesso negado
  }
};