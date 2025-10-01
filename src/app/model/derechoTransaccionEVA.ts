import { DerechoOpcionEVA } from "./derechoOpcionEVA";

export interface DerechoTransaccionEVA{
    idDerechoTransaccion:number;
	derechoOpcion:DerechoOpcionEVA;
	transaccion:string;
	fechaPago:string;
	importeBrutoCurrency:string;
	importeBrutoAmount:string;
	importeBrutoRateType:string;
	retencionPorcentaje:string;
	retencionCurrency:string;
	retencionAmount:string;
	feePorcentaje:string;
	feeCurrency:string;
	feeAmount:string;
	efectivoRecibirQualifier:string;
	efectivoRecibirCurrency:string;
	efectivoRecibirAmount:string;
	ratioQualifier:string;
	ratioQuantity1:string;
	ratioQuantity2:string;
	precioPagarQualifier:string;
	precioPagarCurrency:string;
	precioPagarAmount:string;
	valoresRecibirIndicator:string;
	valoresRecibirIsin:string;
	valoresRecibirDescripcion:string;
	periodoCotizacionInicio:string;
	periodoCotizacionFin:string;
	disposicionFracciones:string;
	importeNetoCurrency:string;
	importeNetoAmount:string;
	importeNetoRateType:string;
	creditoDebito:string;
}