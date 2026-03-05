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

  quantidadeDeMoradores(): number {
    var listaMoradores = this.moradoresService.listarMoradores().subscribe
    var quantMoradores = listaMoradores.length
    console.log(quantMoradores)
    return quantMoradores
  }

  quantidadeDeFuncionarios(): number {
    var listaFuncionarios = this.funcionariosService.listarFuncionarios().subscribe
    var quantFuncionarios = listaFuncionarios.length
    console.log(quantFuncionarios)
    return quantFuncionarios
  }

}