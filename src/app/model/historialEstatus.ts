export interface HistorialEstatus {
  id: number;
  folioId: number;            // puedes usar solo el id del folio
  estatusAnterior?: { id: number; nombre: string };
  estatusNuevo?: { id: number; nombre: string };
  usuario?: { id: number; nombre: string };
  fechaCambio: string;        // usualmente viene como string desde JSON
  comentario?: string;
}