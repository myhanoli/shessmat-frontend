import { Cliente2 } from 'src/app/interface/cliente2';




export class Folio {
 
   id: number;
  folio: string;
  fecha: Date;
  tipoEquipo: string;
  marca: string;
  modelo: string;
  numSerie: string;
  comentarios: string;
  encendido: boolean;
  traeCargador: boolean;
  marcaCargador: string;
  numSerieCargador: string;

  // Datos del cliente (según DTO)
  clienteId: number;
  clienteNombre: string;

   
  estatusActual?: {
    id: number;
    nombre: string;
  };
}