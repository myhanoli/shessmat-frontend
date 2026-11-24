export interface FolioCliente {
  clienteId: number;
  folioId: number;
  folio: string;
  tipoEquipo: string;
  modelo: string;
  comentarios: string;
  fecha: string;
  estatus: string;
  estatusId: number;
  progreso: number;
  cotizacion: number | null;
  cotizacionAprobada: boolean;
  ultimoComentario: string | null;
}
