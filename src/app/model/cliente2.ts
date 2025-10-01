import { Folio } from "./Folio";



export class Cliente {
    id: number;
    nombre: string;
    apellidoPat: string;
    apellidoMat: string;
    direccion: string;
    telefono: string;
    correo: string;
    folios: Folio[]=[];
  }