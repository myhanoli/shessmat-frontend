export interface AgendaRecompra {
    cveEmisora: string;
    serie: string;
    numAccionesCircAnt: string;
    numAccionesCircNeto: string;
    accionesFijas: string;
    accionesVariables: string;
    totalAcciones: string;
    capitalFijo: string;
    capitalVariable: string;
    totalCapital: string;
    ver: string;
    extemporaneo: string;
    idOperacionRecompra: string;
    idEmpresa: string;
    idEmision: string;

    fechaOperacion: string;
    folio: string;
    tipoOperacion: string;
    numeroAcc: string;
    precioUnitario: string;
    importeOperacion: string;
    tipoCargo: string;

    accTesoreria: string;
    accCargoCapitalCtble: string;
    accCirculacion: string;

    folioRecompra: string;

    numAccionesCargoCapCtbleAnt: string;
    numAccionesCargoCapCtbleDesp: string;
        
    idInformacionAccionaria: string;
	operacionSecundaria: number;
}