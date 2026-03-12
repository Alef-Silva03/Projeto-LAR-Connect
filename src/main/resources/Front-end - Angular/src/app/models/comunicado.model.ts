export interface Comunicado {
  id?: number;
  tipo: string;
  titulo: string;
  texto: string;
  data?: Date;
  idCondominio: number;
}