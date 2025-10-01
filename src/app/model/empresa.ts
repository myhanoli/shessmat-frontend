export interface Empresa {
    clave: string;
    descripcion: string;
    razonSocial: string;
    idTipoEmpresa?: string;
    tipoEmpresa: string;
    idTipoParticipante: string;
    participante: string;
    domicilio: string;
    telefono: string;
    responsable: string;
    correo: string;
    esEmisora: boolean;
    mensaje: string;
    banderaClaveCorta: string;
    banderaRazonSocial: string;
    fechaAplicacion: Date;
    idEmpresaColocadora: number;
    datosFiscalesEmpresa: DatosFiscalesEmpresa;
    esFideicomitente: boolean;
    esSIC: boolean;

}

export interface DatosFiscalesEmpresa {
    calleNumero: string;
    colonia: string;
    codigoPostal: string; 
    ciudad: string;
    delegacionMunicipio: string;
    idEstado: string;
    estado: string;
    rfc: string;
    descEstado: string;

}

