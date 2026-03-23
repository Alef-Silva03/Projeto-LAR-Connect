import { Usuario } from "./usuario.model";

export interface ReservaRequest {
  id?: number;
  local: String;
  dataReserva?: Date;
  idUsuario: number
  idCondominio: number;
}

export interface ReservaResponse extends ReservaRequest {
  id: number;
  local: String;
  dataReserva?: Date;
  idCondominio: number;
  idUsuario: number
  usuario: Usuario;
}