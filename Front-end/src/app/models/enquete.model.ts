export interface Enquete {
  id?: number;
  titulo: string;
  opcao1: string;
  opcao2: string;
  votosOpcao1: number;
  votosOpcao2: number;
  data?: Date;
  ativo: boolean;
  idCondominio: number;
  votoSelecionado?: string; // nova propriedade para armazenar o voto do usuário
}