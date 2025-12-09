

/*export interface Cliente {
    id: number;
    folio: number;
    fecha: Date;
    tipoEquipo: String;
    marca: String;
    modelo: String;
    numSerie: String;
    cliente:String;
    comentarios:String;
    
    
}*/

import { Cliente } from "./cliente2";


export interface Folio {
  id?: number;
  folio?: string;
  fecha?: Date;
  tipoEquipo?: string;
  marca?: string;
  modelo?: string;
  numSerie?: string;
  comentarios?: string;

  // Nuevos campos
  encendido?: boolean;
  traeCargador?: boolean;
  marcaCargador?: string;
  numSerieCargador?: string;

  // Relación con Cliente
  cliente?: Cliente;
}
