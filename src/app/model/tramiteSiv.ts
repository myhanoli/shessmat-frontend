export interface TramiteSiv{
    idTramite:string;
	numeroOficio:string;
	fechaOficio:string;
	programaSiv:ProgramaSiv;
	datosOperativosSiv:DatosOperativosSiv;
	remitenteCorreo:string;
	asunto:string;
	contCorreo:string;
	listDirsCorreo:Array<string>;
	estaPublicado:number;
	idTipoValor:string;
}

export interface ProgramaSiv{
    fechaInicioVigencia:string;
	fechaFinVigencia:string;
}

export interface DatosOperativosSiv{
    montoAutorizado:string;
    fechaOficioSiv:Date;
    fechaAutorizacion:Date;
}