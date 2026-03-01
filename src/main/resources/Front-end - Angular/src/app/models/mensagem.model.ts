import { Usuario } from "./usuario.model";

export interface MensagemRequest {
  texto: string;
  data?: Date;
  idCondominio: number;
  idUsuario: number
}

export interface MensagemResponse extends MensagemRequest {
  id: number;
  texto: string;
  data: Date;
  idCondominio: number;
  usuario: Usuario;
}