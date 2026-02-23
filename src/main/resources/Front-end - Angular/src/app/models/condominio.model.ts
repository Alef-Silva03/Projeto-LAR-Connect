export interface CondominioRequest {
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

export interface CondominioResponse extends CondominioRequest {
  id: number;
}