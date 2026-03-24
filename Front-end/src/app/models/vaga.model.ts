export type StatusVaga = 'DISPONIVEL' | 'RESERVADA' | 'VENDIDA' | 'INDISPONIVEL';

export interface Vaga {
  id: number;
  numero: string;
  bloco: string;
  andar?: string;
  descricao: string;
  preco: number;
  status: StatusVaga;
  condominioId?: number;
  nomeCondominio?: string;
  proprietario?: string;
  proprietarioId?: number;
  reservaAtivaCompraId?: number;
  nomeCompradorReserva?: string;
  dataCriacao?: string;
}

export interface ElegibilidadeAnuncioVaga {
  podeAnunciar: boolean;
  motivo: string;
  usuarioId?: number;
  condominioId?: number;
  nomeCondominio?: string;
  numeroVaga?: string;
  bloco?: string;
}

export interface AnuncioVagaRequest {
  descricao: string;
  preco: number;
  andar?: string;
}
