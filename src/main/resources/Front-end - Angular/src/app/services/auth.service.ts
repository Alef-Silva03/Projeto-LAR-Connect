import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../models/usuario.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();
  private readonly API = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

    login(email: string, senha: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API}/login`, { email, senha }, {
        withCredentials: true  // ← ESSENCIAL
    }).pipe(
        tap(response => {
        localStorage.setItem('perfil', response.perfil);
        localStorage.setItem('nome', response.nome);
        localStorage.setItem('email', response.email);
        localStorage.setItem('cpf', response.cpf);
        localStorage.setItem('telefone', response.telefone);
        localStorage.setItem('cargo', response.cargo);
        localStorage.setItem('apartamento', response.apartamento);
        localStorage.setItem('condominio', response.condominio ? response.condominio.nomeCondominio : '');
        localStorage.setItem('token', response.reset_token); // se necessário
        this.loggedIn.next(true);
        })
    );
    }

    getCurrentUser(): LoginResponse | null {
    const userStr = localStorage.getItem('perfil');
    return userStr ? JSON.parse(userStr) : null;
  }
  
  logout(): void {
    localStorage.removeItem('token'); 
    localStorage.removeItem('perfil');
    localStorage.removeItem('nome');
    localStorage.removeItem('email');
    localStorage.removeItem('cpf');
    localStorage.removeItem('telefone');
    localStorage.removeItem('condominio');
    this.loggedIn.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token'); 
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

/*
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth';
  private usuarioKey = 'usuario';

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem(this.usuarioKey, JSON.stringify(response));
          localStorage.setItem('perfil', response.perfil);
          localStorage.setItem('nome', response.nome);
          localStorage.setItem('email', response.email);
          if (response.condominio) {
            localStorage.setItem('condominio', response.condominio.nomeCondominio);
          }
        })
      );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {})
      .pipe(
        tap(() => {
          localStorage.clear();
        })
      );
  }

  getCurrentUser(): LoginResponse | null {
    const userStr = localStorage.getItem(this.usuarioKey);
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  getPerfil(): string | null {
    return localStorage.getItem('perfil');
  }

  hasCondominio(): boolean {
    const user = this.getCurrentUser();
    return !!user?.condominio;
  }
}*/