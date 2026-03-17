import { Condominio } from "./usuario.model";

export interface MensagemPrivada {
  id?: number;
  tipo: string;
  titulo: string;
  assunto: string;
  texto: string;
  data?: Date;
  condominio: Condominio;
  idAutor?: number;
  idDestinatario?: number;
}