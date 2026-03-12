import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MoradoresService, Morador } from '../../services/moradores';
import { FuncionariosService } from '../../services/funcionarios';

@Component({
  selector: 'app-dados-condominio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dados-condominio.html',
  styleUrl: './dados-condominio.css',
})
export class DadosCondominio {
  moradores: Morador[] = [];

  constructor(
    private moradoresService: MoradoresService,
    private funcionariosService: FuncionariosService,
  ) {}

  dadosCondominio() {
    const usuarioString = localStorage.getItem('usuario')

    if (!usuarioString) {
      alert('Usuário não encontrado. Faça login novamente.');
      return;
    }
    const usuario = JSON.parse(usuarioString)
    const condominio = usuario.condominio
    console.log(condominio)
    return condominio
  }

   quantidadeDeMoradores() {
     this.moradoresService.listarMoradores().subscribe((listaMoradores: Morador[]) => {
       const quantMoradores = listaMoradores.length + 1;
       localStorage.setItem('quantMoradores', quantMoradores.toString())
     });
     return localStorage.getItem('quantMoradores')
    }

  quantidadeDeFuncionarios() {
     this.funcionariosService.listarFuncionarios().subscribe((listaFuncionarios: Morador[]) => {
       const quantFuncionarios = listaFuncionarios.length;
       localStorage.setItem('quantFuncionarios', quantFuncionarios.toString())
     });
     return localStorage.getItem('quantFuncionarios')
  }

}