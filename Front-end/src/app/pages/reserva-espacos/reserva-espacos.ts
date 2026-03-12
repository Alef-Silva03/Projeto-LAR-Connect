import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Reserva } from '../../models/reserva.model';
import { ReservaService } from '../../services/reserva-service';

@Component({
  selector: 'app-reserva-espacos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reserva-espacos.html',
  styleUrls: ['./reserva-espacos.css']
})

export class ReservaEspacos implements OnInit {
    reserva: Reserva = {
        reservaChurrasqueira: undefined,
        reservaSalao: undefined,
        reservaPlayground: undefined,
        reservaAcademia: undefined,
        reservaQuadra: undefined,
        reservaCinema: undefined,
        idCondominio: 0,
        idUsuario: 0
    };

    constructor(
        private reservaService: ReservaService,
        private cdr: ChangeDetectorRef,
        public authService: AuthService,
    ) {}
    
    ngOnInit(): void {
        this.cdr.detectChanges();
    }

    realizarReserva(): void {
        const usuarioString = localStorage.getItem('usuario');
        if (!usuarioString) {
            alert('Usuário não encontrado. Faça login novamente.');
            return;
        }
        const usuario = JSON.parse(usuarioString);

        this.reserva.idCondominio = usuario.condominio.id;
        this.reserva.idUsuario = usuario.id
        console.log(this.reserva)
        this.reservaService.realizarReserva(this.reserva).subscribe({
        next: () => {
            alert('Reserva feita com sucesso!');
        },
        error: (err) => {
            console.error('Erro ao fazer reserva.', err);
            const mensagem = err.error || 'Erro ao realizar reserva. Verifique o console.';
            alert(`Erro ao cadastrar: ${mensagem}`);


        }
    });
  }

}