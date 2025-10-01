export interface SivCTiposTramites{
    idTipoTramite:number;
    idGrupo:number;
    comCtpvalor: TipoValor;
    fechaCreacion:Date;
    sistema:string;
    creadoPor:string;
    modificadoPor:string;
    fechaModificacion:Date;
    estatus:number;
    nombre:string;
    idValor:string;
    idTipoValor:string;
    idMercado:number;
    valorDescrip:string;
    mercadoDescrip:string;
    mensaje:string;
    id:number;
    desc:string;
}

export interface TipoValor{
    stringidTipoValor:string;
    idTipoMercado:string ;
    stringdescripcion:string;
    fechaCreacion:Date;
    stringsistema:string;
    stringcreadoPor:string;
    stringmodificadoPor:string;
    fechaModificacion:Date;
    comCtpsinverxmercado:ComCtpsinverxmercado;
    mercadoOrigen:Mercado;
    mercado:Mercado;
    tipoLiquidacion:TipoLiquidacion;
    montoCuotaEstudio:number;
    StringidPlazoTiempo:string;
    titulo:string;
	claveFacturacionInscripcion:string;
	StringclaveFacturacionMantenimiento:string;
	StringclaveFacturacionEstudio:string;
	diasHabilesCambioTasa:number;
	idTipoLiquidacion:number;
	importePersonaFisica:number;
	tasaPersonaFisica:number;
	importePersonaMoral:number;
	tasaPersonaMoral:number;
    valorFungible:boolean;
}

export interface Mercado{
    idMercado:number;
    descripcion:string;
    fechaCreacion:Date;
    creadoPor:string;
    sistema:string;
    modificadoPor:string;
    fechaModificacion:Date;
    clave:string;
}

export interface TipoLiquidacion{
	idTipoLiquidacion:number;
	cveTipoLiquidacion:string;
	descripcion:string;
	horasLiq:number;
	fechaCreacion:Date;
	creadoPor:string;
	sistema:string;
	modificadoPor:string;
	fechaModificacion:Date;
}

export interface ComCtpsinverxmercado{
    id:ComCtpsinverxmercadoId;
    comCmercados:Mercado;
    comCtpsinversion:ComCtpsinversion;
    fechaCreacion:Date;
    creadoPor:string;
    sistema:string;
    modificadoPor:string;
    fechaModificacion:Date;
}

export interface ComCtpsinverxmercadoId{
    idMercado:number;
    idTpinversion:string;
}

export interface ComCtpsinversion{
    idTpinversion:string;
    descripcion:string;
    fechaCreacion:Date;
    creadoPor:string;
    sistema:string;
    modificadoPor:string;
    fechaModificacion:Date;
}