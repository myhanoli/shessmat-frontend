import { Folio } from "./Folio";

export class Cliente2 {
    id: number;
    nombre: string;
    apellidoPat: string;
    apellidoMat: string;
    direccion: string;
    telefono: string;
    correo: string;
     fechaAlta: Date | string;
    password?: string;
    folios: Folio[]=[];
    
  }