export interface MensagemPrivada {
  id?: number;
  tipo: string;
  titulo: string;
  assunto: string;
  texto: string;
  data?: Date;
  idCondominio: number;
  idAutor?: number;
  idDestinatario?: number;
}