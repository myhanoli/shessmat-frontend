import { DerechoNotaEVA } from "./derechoNotaEVA";
import { DerechoOpcionEVA } from "./derechoOpcionEVA";
import { DerechoTipoEventoEVA } from "./derechoTipoEventoEVA";

export interface DetalleAgendaDerechoSicEVA{
    idDerechoOpcionNota:number;
    nota: string;

    idEmisora:number;  //emisora
	claveEmisora: string; //emisora
	idTipoValor: string;   //emision
	claveSerie: string; //emision
	isin: string; //emision
	status: string; // estadoDerecho
	idStatus:number;
	
	fechaExderecho: string;
	fechaEfectos: string;
	fechaRegistro: string;
	fechaPago: string;
	importeBruto: string;   
	notaSeguimiento: string;
	
	//nuevos campos
	confirmado: string;
	completo: string;
	folioEvento: string;
	
	idDerechoSic:number;
	folioReferencia: string; 
	numReenvios:number;
	tipoEventoCorpo: string;
	tipoEventoCorpoDesc: string; 
	fechaAnuncio: string;
	tipoMensaje: string;
	fechaAsamblea: string;
	fechaSuspension: string;
	dueBillOffDate: string;
	notaBoletin: string;
	indicador: string;
	estatusDetalleEvento: string;
	mercadoPrincipal: string;
	claveDeCotizacion: string;
	razonSocial: string;

    listaTipoEvento:Array<DerechoTipoEventoEVA>;
	listaOpcion:Array<DerechoOpcionEVA>;
	listaNota:Array<DerechoNotaEVA>;

	publicarEnBoletin:boolean;
	difundir:boolean;
	cominde:boolean;
	
    idEmision:number;
	idEmpresaEmisora:number;
	idEmpresa:number;
	
	ratioQualifier: string;
	ratioQuantity1: string;
	ratioQuantity2: string;
	
	efectivoRecibirQualifier: string;
	efectivoRecibirCurrency: string;
	efectivoRecibirAmount: string;
}