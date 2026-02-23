export interface Condominio {
  id: number;
  nomeCondominio: string;
  cep: string;
  pais: string;
  estado: string;
  cidade: string;
  logradouro: string;
  numeroCondominio: number;
  blocos: number;
  apartamentos: number;
}

export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
  cpf?: string;
  telefone?: string;
  perfil: 'SINDICO' | 'PROPRIETARIO' | 'INQUILINO' | 'FUNCIONARIO';
  condominio?: Condominio;
  apartamento?: string;
  cargo?: string;
  resetToken?: string;
  tokenExpiration?: Date;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  perfil: string;
  condominio: Condominio | null;
  cargo: string;
  apartamento: string;
  reset_token: string;
}