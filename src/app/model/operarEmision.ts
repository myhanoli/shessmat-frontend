export interface OperarEmision{
    idEmision:number;
	cveEmisora:string;
	tipoValor:string;
	serie:string;
	cveEmision:string;
	fechaBMV:string;
	fechaCNBV:string;
	oficioCNBV:string;
	observaciones:string;
	fechaVencimiento:string;
	idEstatusEmision:number;
	fechaAplicacion;
	idEmisora:number;
	habilitada:boolean;
	idEmpresaParticipante:number;
	cveEmpresaParticipante:string;
	
	fechaEmisionSIC:string;
	precioColocacionSIC:number;
}