export interface Participante {
    idParticipante: number;
	descripcion: string;
}

export interface Empresa {
    idEmpresa: number;
	idTpEmpresa: number;
    datosGeneralesEmisora: DatosGenerales;
    //lista responsableTramite
	responsableTramite: ResponsableTramite;
	datosFiscalesEmisora: DatosFiscalesEmisora;
    //lista funcionarioEmisora
	funcionarioEmisora: FuncionarioEmisora;
	//lista ConsejeroAdmonEmpresa
	consejeroAdmonEmpresa: ConsejeroAdmonEmpresa;
	idPanel: string;
	casfim:string;
	
}

export interface ParticipacionEmpresa {
    id: number;
	idParticipacion: number;
	participacion: string;
	tieneParticipacion: boolean;
	tieneParticipacionAux:boolean;
	existente: boolean;

}

export interface DatosGenerales {
    cveEmisora: string;
	razonSocial: string;
	fechaOficio: string;
	fechaListadoBMV: string;
	paginaInternet: string;
	actividadEconomica: string;
	productosPrinc: string;
	historiaEmpresa: string;
	casfim: string;
	tipoEmpresa: string;
	sector: string;
	subsector: string;
	ramo: string;
	subramo: string;
	consolida: string;
	patrocinador: string;
	mercadoReconocido: string;
    mercadoPrincipal: string;
    paisOrigen: string;
    paisPrincipal: string;
	//Domicilio Social
	calleNumero: string;
	colonia: string;
	codigoPostal: string;
	ciudad: string;
	estado: string;
	telefono: string;
	fax: string;
	descEstado: string;
	descTipoEmpresa: string;
	descSector: string;
	descSubsector: string;
	descRamo: string;
	descSubramo: string;
	descMercadoReconocido: string;
	descPaisOrigen: string;
    descMercadoPrincipal: string;
	descPaisPrincipal: string;
    descPatrocinador: string;
    urlInfoFinanciera: string;
    urlEventosRelevantes: string;
    idEmpresaFiduciario: number;
    extranjera: string;
    esTipoValorDeuda: string;
    domicilioSocial: string;
    clasificacionETF: string;
    regionETF: string;
    objetoInversion: string;
    assetManager: string;
	indexProvider: string;
	indiceReplicaSIC: string;
	
}

export interface ResponsableTramite {
    idResponsableTramite: number;
	nombre: string;
	apPaterno: string;
	apMaterno: string;
	telefono: string;
	email: string;
	
}

export interface DatosFiscalesEmisora {
    calleNumero: string;
	colonia: string;
	codigoPostal: string;
	ciudad: string;
	delegacionMunicipio: string;
	estado: string;
	rfc: string;
	descEstadoF: string;
}

export interface FuncionarioEmisora {
    idFuncionario: number;
	puestoBMV: string;
	puestoEmpresa: string;
	tituloProfesional: string;
	nombre: string;
	apPaterno: string;
	apMaterno: string;
	domicilio: string;
	colonia: string;
	codigoPostal: string;
	ciudad: string;
	estado: string;
	telefono: string;
	fax: string;
	email: string;
	idPuesto: number;
	idEstado: string;
	idEmpresa: number;
}

export interface ConsejeroAdmonEmpresa {
    cargo: string;
	tipoConsejero: string;
	titulo: string;
	nombre: string;
	apellidoPaterno: string;
	apellidoMaterno: string;
	idConsejero: number;
	idPuesto: number;
	//Byte idTipoConsejero.
	idTipoConsejero: number;
	idEmpresa: number;
	
}