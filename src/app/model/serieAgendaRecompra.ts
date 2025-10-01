import { AgendaRecompra } from "./agendaRecompra";

export interface SerieAgendaRecompra{
    serie: string;

    accTesoreriaUlt: string;
    accTesoreriaAct: string;
    accCirculacionUlt: string;
    accCirculacionAct: string;
    accCargoCapContUlt: string;
    accCargoCapContAct: string;
    importeCapContable: string;
    importeCapSocial: string;
	
	listGrid: Array<AgendaRecompra>;
}