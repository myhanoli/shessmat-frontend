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


@Injectable({
  providedIn: 'root'
})
export class FolioService {

private httpHeaders = new HttpHeaders({
'Content-Type': 'application/json',
'Accept': 'application/json',
//'Access-Control-Allow-Origin': 'http://localhost:8080/'
'Access-Control-Allow-Origin': 'https://shessmat-backend-production.up.railway.app/'
})

  constructor(private http: HttpClient) {
  }

  getFolios(): Observable<Folio[]> {
    return this.http.get('api/listaFolios').pipe(
      map(response => response as Folio[])
    );
  }


  getFoliosAprobados(): Observable<FolioAprobadosModel[]> {
    return this.http.get('api/listaFoliosAprobados').pipe(
      map(response => response as FolioAprobadosModel[])
    );
  }
  

  creaFolio(folio:Folio):Observable<Folio>{
    console.log("cliente in service : " + folio.cliente.id);
    /*console.log("marca in service : " + folio.marca);
    console.log("modelo in service: " + folio.modelo);
    console.log("numSerie in service: " + folio.numSerie);
    console.log("Comentario in service: " + folio.comentarios);*/
  console.log("JsonFolio: " + folio)
    return this.http.post<Folio>('http://localhost:8080/api/guardarFolio',folio,{headers:this.httpHeaders})
   // return this.http.post<Folio>('https://shessmat-backend-production.up.railway.app/api/guardarFolio',folio,{headers:this.httpHeaders})
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
  return this.http.get('http://localhost:8080/api/getEndFolio', { responseType: 'text' });
}


  getByFiltros(filtros:FolioModel): Observable<Folio[]> {
    return this.http.post<Folio[]>('api/folios/getFiltros',filtros,{headers:this.httpHeaders})
  }


  sendFolio(array:FolioAprobadosModel[]):Observable<any>{ 
    console.log("JsonFolio: " + array[0])
    
      return this.http.post<Folio>('api/foliosSelect',array,{headers:this.httpHeaders})
    }


  /*  subirImagen(base64: string, folio: string): Observable<any> {
    const body = { folio, base64 };
    return this.http.post('api/upload',body,{headers:this.httpHeaders});
  }

  subirMultiplesImagenes(imagenes: { base64: string; folio: string }[]): Observable<any[]> {
    // Envía todas las imágenes en paralelo
    console.log('Se enviaron las imagenes con su folio')
    return forkJoin(imagenes.map(img => this.subirImagen(img.base64, img.folio)));
  }*/

    subirMultiplesImagenes(formData: FormData): Observable<any> {
      console.log('Folio:', formData.get('folio'));
  return this.http.post('http://localhost:8080/api/upload',formData);
 // return this.http.post('https://shessmat-backend-production.up.railway.app/api/upload',formData);
}


}