export interface ReporteReparacion {
  fecha: string;
  folio: number;
  tecnico: string;
  total: number;
  manoObra: number;
  usoPiezas: boolean;
}

export interface ReportesReparacionesResponse {
  totalReparaciones: number;
  totalIngresos: number;
  totalManoObra: number;
  data: ReporteReparacion[];
}
