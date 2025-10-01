import { DerechoOpcionNotaEVA } from "./derechoOpcionNotaEVA";
import { DerechoTransaccionEVA } from "./derechoTransaccionEVA";

export interface DerechoOpcionEVA{
    idDerechoOpcion:number;
    numero: number;
    tipo: string;
    flag: string;
    marketDeadline: string;
    disponibilidad: string;

    listaOpcionTransaccion: Array<DerechoTransaccionEVA>;
    listaOpcionNota: Array<DerechoOpcionNotaEVA>;
}