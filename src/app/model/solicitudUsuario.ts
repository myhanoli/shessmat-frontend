export interface CriteriosConsultaSolicitudes {
    usuario: string;
	estado: number;
	fechaInicio: Date;
	fechaFin: Date;
}

export interface UsuarioGrid {
    id: number;
	nombreCompleto: string;
	usuario: string;
	correoElectronico: string;
	empresa: string;
	razonSocial: string;
	estado: string; 
	fechaSolicitud: string;
	fechaActualizacion: string;
}

export interface Usuario {
    idUsuario: number;
	idEmpresa: number;
	idParticipante: number;
	idEstado: number;
	idPrefijo: number;
	idEmisoraSerie: number;
	numeroEmisiones: number;
	nombre: string;
	nombreUnico: string;
	paterno: string;
	materno: string;
	cveEmpresa: string;
	razonSocial: string;
	estado: string;
	fechaSolicitud: string;
	fechaAlta: string;
	privilegioEnvio: string;
	cveUsuario: string;
	contrasena: string;
	telefono: string;
	correoElectronico: string;
	direccion: string;
	creadoPor: string;
	fechaCreacion: string;
	sistema: string;
	modificadoPor: string;
	fechaModificacion: string;
	fechaModificacionPwd: string;
	cvePizarra: string;
	descripcionParticipante: string;
	descripcionEmpresa: string;
	usuarioCancelado:boolean;
	estadoCarta: string;
	estadoPoderes: string;
	estadoId: string;
	estadoPrivilegiosDali: string;
	lider:bigint;
	numCertificado: string;
    nombreUsuarioResponsable: string;
    cveUsuarioResponsable: string;
}

export interface VentanaSolicitudesUsuario {
    idUsuario:number;
	idEmpresa: number;
	estadoCartaSolicitud: bigint;
	estadoPoderesSustitucion: bigint;
	estadoIdentificacionOficial: bigint;
	estadoPrivilegiosDali: bigint;
	idParticipante:number;
	privilegioEnvio: bigint;
	estadoUsuario: bigint;
	esEmisora: bigint;
	idTipoDeEmpresa:number;
	numCertificado: string;
}


export interface DocumentoSolicitudUsuario {
    nombreArchivo: string;
	
	/** Contenido del archivo de la solicitud del usuario */
	//private byte[] archivoAdjunto;

}