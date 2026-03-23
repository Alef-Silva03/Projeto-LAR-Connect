import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ReservaRequest, ReservaResponse } from '../../models/reserva.model';
import { ReservaService } from '../../services/reserva-service';
import { HttpErrorResponse } from '@angular/common/http'; // NOVA LINHA - Import necessário

@Component({
  selector: 'app-reserva-espacos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reserva-espacos.html',
  styleUrls: ['./reserva-espacos.css']
})

export class ReservaEspacos implements OnInit {
    reservas: ReservaResponse[] = [];
    reserva: ReservaRequest = {
        local: '',
        dataReserva: undefined,
        idCondominio: 0,
        idUsuario: 0,
    };

    // NOVAS LINHAS - Objetos separados para cada formulário
    reservaChurrasqueira: ReservaRequest = {
        local: 'churrasqueira',
        dataReserva: undefined,
        idCondominio: 0,
        idUsuario: 0,
    };
    
    reservaSalao: ReservaRequest = {
        local: 'salao',
        dataReserva: undefined,
        idCondominio: 0,
        idUsuario: 0,
    };
    
    reservaPlayground: ReservaRequest = {
        local: 'playground',
        dataReserva: undefined,
        idCondominio: 0,
        idUsuario: 0,
    };
    
    reservaQuadra: ReservaRequest = {
        local: 'quadra',
        dataReserva: undefined,
        idCondominio: 0,
        idUsuario: 0,
    };

    constructor(
        private reservaService: ReservaService,
        private cdr: ChangeDetectorRef,
        public authService: AuthService,
    ) {}
    
    ngOnInit(): void {
    this.cdr.detectChanges();
    let escolha = 'churrasqueira'
    localStorage.setItem('escolhaTabela', escolha)
    this.listarReservas();
    this.cdr.detectChanges();
    }

    listarReservas(): void {
     const usuarioString = localStorage.getItem('usuario');
        if (!usuarioString) {
            alert('Usuário não encontrado. Faça login novamente.');
            return;
        }
        const usuario = JSON.parse(usuarioString);
        
        this.reserva.idCondominio = usuario.condominio.id;
        this.reserva.idUsuario = usuario.id
        
        // NOVAS LINHAS - Atualiza os objetos separados com os dados do usuário
        this.reservaChurrasqueira.idCondominio = usuario.condominio.id;
        this.reservaChurrasqueira.idUsuario = usuario.id;
        this.reservaSalao.idCondominio = usuario.condominio.id;
        this.reservaSalao.idUsuario = usuario.id;
        this.reservaPlayground.idCondominio = usuario.condominio.id;
        this.reservaPlayground.idUsuario = usuario.id;
        this.reservaQuadra.idCondominio = usuario.condominio.id;
        this.reservaQuadra.idUsuario = usuario.id;
        
    this.reservaService.listarReservas().subscribe({
        next: (data) => {
        this.reservas = data;
        this.cdr.detectChanges();
        },
        error: (err) => console.error('Erro ao carregar Reservas', err)
        });
    }

    private getReservaPorLocal(local: string): ReservaRequest {
        switch(local) {
            case 'churrasqueira':
                return this.reservaChurrasqueira;
            case 'salao':
                return this.reservaSalao;
            case 'playground':
                return this.reservaPlayground;
            case 'quadra':
                return this.reservaQuadra;
            default:
                return this.reserva;
        }
    }

    realizarReserva(local: String): void {
        const usuarioString = localStorage.getItem('usuario');
        if (!usuarioString) {
            alert('Usuário não encontrado. Faça login novamente.');
            return;
        }
        const usuario = JSON.parse(usuarioString);

        const reservaEspecifica = this.getReservaPorLocal(local.toString());
        
        this.reserva.local = local;
        this.reserva.idCondominio = usuario.condominio.id;
        this.reserva.idUsuario = usuario.id
        
        const reservaParaEnviar = reservaEspecifica;
        
        this.reservaService.realizarReserva(reservaParaEnviar).subscribe({
        next: (response: any) => {
            if (typeof response === 'string') {
                alert(response); 
            } else if (response && response.mensagem) {
                alert(response.mensagem);
            } else {
                alert('Reserva feita com sucesso!');
            }
            
            reservaEspecifica.dataReserva = undefined;
            
            this.listarReservas();
        },
        error: (err: HttpErrorResponse) => { 
            console.error('Erro ao fazer reserva.', err);
            
            if (err.status === 201 && err.error && err.error.text) {
                alert(err.error.text); 
                reservaEspecifica.dataReserva = undefined;
                this.listarReservas();
                return;
            }
            
            let mensagemErro = 'Erro ao realizar reserva. Verifique o console.';
            if (err.error) {
                if (typeof err.error === 'string') {
                    mensagemErro = err.error;
                } else if (err.error.message) {
                    mensagemErro = err.error.message;
                } else if (err.message) {
                    mensagemErro = err.message;
                }
            }
            alert(`Erro ao cadastrar: ${mensagemErro}`);
        }
    });
  }

  excluirReserva(id: number) {
    if (confirm('Tem certeza de que deseja excluir esta reserva?')) {
      this.reservaService.excluirReserva(id).subscribe({
        next: () => {
          this.reservas = this.reservas.filter(reserva => reserva.id !== id);
          this.cdr.detectChanges();
        },
        error: () => {
          alert('Erro no processo de exclusão');
        }
      });
    }
  }

  escolhaTabela(escolha: string){
    if (escolha == 'churrasqueira'){
        localStorage.setItem('escolhaTabela', 'churrasqueira');
    } else if (escolha == 'playground'){
        localStorage.setItem('escolhaTabela', 'playground');
    } else if (escolha == 'quadra'){
        localStorage.setItem('escolhaTabela', 'quadra');
    } else if (escolha == 'salao'){
        localStorage.setItem('escolhaTabela', 'salao');
    }
    this.cdr.detectChanges();
  }

  getEscolhaTabela(): string{
    let escolhaTabela = localStorage.getItem('escolhaTabela');
    if (escolhaTabela != null){
        return escolhaTabela
    }
    return ''
  }

  getUsuario(){
    const usuarioString = localStorage.getItem('usuario');
    if (!usuarioString) {
        alert('Usuário não encontrado. Faça login novamente.');
        return;
    }
    const usuario = JSON.parse(usuarioString);
    return usuario
  }
}