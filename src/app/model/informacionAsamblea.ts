export interface InformacionAsamblea{
    id:number;
	serie:string;
	tipo:string;
	fecha:string;
	
	idEmisora:number;
	idEmision:number;
	tipoAsamblea:number;
	hora:string;
	lugar:string;
	ordenDia:string;
	reqAsistencia:string;
	
	contCorreo:string;
	listDirsCorreo:Array<string>;
	
	envExtemp:boolean;
	envFolletoRS:string;
	envActRNV:string;
	razon:string;
	
	cveEmisora:string;
	descTipoAsamb:string;
	folioConvoc:string;
	edoRevision:string;
	idAcuerdo:boolean;
	derecho:string;
	ver:string;
	
	porcentAsistencia:string;
	resumenAcuerdos:string;
		
	tieneDerechos:boolean;
	
	//permisos
	permiAltaManual:boolean;
	permiConsultar:boolean;
}