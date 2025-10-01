export interface DerechoSicEVA{
    idEmisora:number; // emisora
    claveEmisora:string; // emisora
    idTipoValor:string; // emision
    claveSerie:string; // emision
    isin:string; // emision
    status:string; // estadoDerecho
    fechaExderecho:string;
    fechaEfectos:string;
    fechaRegistro:string;
    fechaPago:string;
    importeBruto:string;
    notaSeguimiento:string;
    idDerechoSic:number;
    folioReferencia:string;
    numReenvios:string;
    tipoEventoCorpo:string; // tipoEventoCorporativo
    folioEvento:string;
    notasBoletin:string;
}
