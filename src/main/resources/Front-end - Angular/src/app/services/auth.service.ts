import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../models/usuario.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private loggedIn = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this.loggedIn.asObservable();
    private readonly API = 'http://localhost:8080/api/auth';

    constructor(private router: Router, private http: HttpClient) {}

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
            localStorage.setItem('token', response.reset_token);
            this.loggedIn.next(true);
        })
    );
    }

    getCurrentUser(): LoginResponse | null {
        const usuarioJson = localStorage.getItem('usuario');
        return usuarioJson ? JSON.parse(usuarioJson) : null;
    }

    getPerfil(): String | null {
        return localStorage.getItem('perfil');
    }

    getToken(): string | null {
        return localStorage.getItem('token'); 
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
    
    logout(): void {
        fetch("http://localhost:8080/api/auth/logout", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });
        localStorage.clear();
        this.router.navigate(['/']); 

        this.loggedIn.next(false);
        }

    finalizarEntrega(id: any) {
        throw new Error('Method not implemented.');
    }
    registrarEncomenda(novaEntrega: { apto: string; bloco: string; moradorNome: string; descricao: string; }) {
        throw new Error('Method not implemented.');
    }
    listarEncomendas() {
        throw new Error('Method not implemented.');
    }
}