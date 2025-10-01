import { SerieAgendaRecompra } from "./serieAgendaRecompra";

export interface DetalleAgendaRecompra{

    fechaRecepcion: string;
    cveEmisora: string;
    razonSocial: string;

    listSeries:  Array<SerieAgendaRecompra>;

    remanenteUlt: string;
    remanenteAct: string;
    comentarios: string;
}


