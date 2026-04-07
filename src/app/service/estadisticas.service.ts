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


@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

private httpHeaders = new HttpHeaders({
'Content-Type': 'application/json',
'Accept': 'application/json',
//'Access-Control-Allow-Origin': 'http://localhost:8080/'
'Access-Control-Allow-Origin': 'environment.urlHost'
})

  constructor(private http: HttpClient) {
  }

 
getTotalFoliosPorAnio(anio: number) {
  //return this.http.get<any>(`http://localhost:8080/api/folios/total-por-anio/${anio}`);
  return this.http.get<any>(`${environment.urlHost}api/folios/total-por-anio/${anio}`);
}

getFoliosPorMes(anio: number) {
  return this.http.get<any[]>(`${environment.urlHost}api/folios/por-mes/${anio}`);
}

getRankingClientes() {
  return this.http.get<any[]>(`${environment.urlHost}api/folios/ranking-clientes`);
}

getTop10Clientes() {
  return this.http.get<any[]>(`${environment.urlHost}api/folios/ranking-clientes/top10`);
}

}