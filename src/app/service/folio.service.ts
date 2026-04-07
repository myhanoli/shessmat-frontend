import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders,HttpRequest, HttpEvent} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';

import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Folio } from '../interface/Folio';
import { TipoEquipo } from '../interface/TipoEquipo';
import { FolioModel } from '../interface/FolioModel';
import { FileModel } from '../interface/FileModel';
import { FolioAprobadosModel } from '../interface/FoliosAprobadosModel';
import { FolioRequest } from '../interface/FolioRequest';
import { AuthService } from './auth-service.service';
import { HistorialEstatus } from '../model/historialEstatus';




@Injectable({
  providedIn: 'root'
})
export class FolioService {

private httpHeaders = new HttpHeaders({
'Content-Type': 'application/json',
'Accept': 'application/json',
'Access-Control-Allow-Origin': 'http://localhost:8080/'
//'Access-Control-Allow-Origin': 'https://shessmat-backend-production.up.railway.app/'
})



  constructor(private http: HttpClient, private authService: AuthService) { }


  getFolios(): Observable<Folio[]> {
    return this.http.get(environment.urlHost+'api/listaFolios').pipe(
      map(response => response as Folio[])
    );
  }

  getTicket(folioId: number): Observable<Blob> {
    return this.http.get(`${environment.urlHost}api/folios/${folioId}/ticket`, {
      responseType: 'blob'
    });
  }

  getFoliosAprobados(): Observable<FolioAprobadosModel[]> {
    return this.http.get('api/listaFoliosAprobados').pipe(
      map(response => response as FolioAprobadosModel[])
    );
  }
  

  creaFolio(folio:FolioRequest):Observable<Folio>{
    folio.idEstatus = 1;
  console.log("JsonFolio: " + folio)
  
    return this.http.post<Folio>('${environment.urlHost}api/guardarFolio',folio,{headers:this.httpHeaders})
   // return this.http.post<Folio>('${environment.urlHost}api/guardarFolio',folio,{headers:this.httpHeaders})
  }


  actualizarFolio(folio: any) {
  return this.http.put(`${environment.urlHost}api/folios/${folio.id}`, folio);
}

  exportPdf(elementPDF:FolioModel):Observable<Blob>{
    console.log("elementPDF: " + elementPDF.folio)
    return this.http.post('api/exportPdf',elementPDF,{responseType:'blob'});
  }

  //Metodo que envia los archivos al endpoint /upload 
  upload(file: FileModel): Observable<any>{
    //console.log("JsonFile: " + file.base64)
    return this.http.post<FolioModel>('api/upload',file,{headers:this.httpHeaders})
  }

  //Metodo para Obtener los archivos
  getFiles(){
    return this.http.get('api/files');
  }

  //Metodo para borrar los archivos
  deleteFile(filename: string){
    return this.http.get('api/delete/${filename}');
  }

  getFolioByMarca(marca:String): Observable<Folio[]> {
    return this.http.get<Folio[]>('api/getFolioByMarca/'+marca,{headers:this.httpHeaders}).pipe(
      map(response => response as Folio[])
    );
  }


 
 getEndFolio(): Observable<string> {
  return this.http.get(`${environment.urlHost}api/getEndFolio`, { responseType: 'text' });
}


  getByFiltros(filtros:FolioModel): Observable<Folio[]> {
    return this.http.post<Folio[]>(`${environment.urlHost}api/folios/getFiltros`, filtros, {headers:this.httpHeaders})
  }


  sendFolio(array:FolioAprobadosModel[]):Observable<any>{ 
    console.log("JsonFolio: " + array[0])
    
      return this.http.post<Folio>('${environment.urlHost}api/foliosSelect',array,{headers:this.httpHeaders})
    }


    subirMultiplesImagenes(formData: FormData): Observable<any> {
      console.log('Folio:', formData.get('folio'));
  return this.http.post('${environment.urlHost}api/upload',formData);
 // return this.http.post('${environment.urlHost}api/upload',formData);
}




guardarSeguimiento(dto: { folioId: number; estatusId: number; comentario: string }): Observable<any> {
  return this.http.post(`${environment.urlHost}api/seguimiento`, dto);
}


 getHistorial(folioId: number): Observable<HistorialEstatus[]> {
		    return this.http.get<HistorialEstatus[]>(`${environment.urlHost}api/${folioId}/historial`);
		  }



}