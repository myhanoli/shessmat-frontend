export interface SeguimientoFolioDTO {
  folioId: number;
  estatusId: number;
  comentario: string;
  cierre?: {
    usoPiezas: boolean;
    piezas: { descripcion: string; costo: number }[];
    manoObra: number;
    total: number;
  };
}