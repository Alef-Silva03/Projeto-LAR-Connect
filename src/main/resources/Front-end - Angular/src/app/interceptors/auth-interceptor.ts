import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
  return next(req).pipe(
    catchError(error => {
      if (error.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('nome');
        localStorage.removeItem('email');
        localStorage.removeItem('cpf');
        localStorage.removeItem('cpfVerificado');
        localStorage.removeItem('apto');
        localStorage.removeItem('bloco');
        localStorage.removeItem('vaga');
        localStorage.removeItem('telefone');
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};