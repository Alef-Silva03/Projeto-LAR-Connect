export interface Reserva {
  id?: number;
  reservaChurrasqueira?: Date;
  reservaSalao?: Date;
  reservaPlayground?: Date;
  reservaAcademia?: Date;
  reservaQuadra?: Date;
  reservaCinema?: Date;
  idCondominio: number;
  idUsuario: number
}