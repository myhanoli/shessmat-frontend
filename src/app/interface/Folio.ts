import { Cliente2 } from 'src/app/interface/cliente2';




export class Folio {
  id: number;
  folio:string
  fecha: Date;
  tipoEquipo: String;
  marca: String;
  modelo: String;
  numSerie: String;
  cliente:Cliente2;
  comentarios:String;
}