

import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable,of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Opcion } from '../model/Opcion';


// Interfaz para el dropdown de PrimeNG
export interface DropdownOption {
  label: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

    constructor(private http: HttpClient) {   }




 buscarMarcas(query: string): Observable<Opcion[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<Opcion[]>(environment.urlHost+'api/marcas', { params });
  }

  buscarEquipos(query: string): Observable<Opcion[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<Opcion[]>(environment.urlHost+'api/equipos', { params });
  }


   /* getEstatus(query: string): Observable<Opcion[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<Opcion[]>(environment.urlHost+'api/estatus', { params });
  }*/

     // Devuelve la lista de estatus original
  /*getEstatus(): Observable<Estatus[]> {
    return this.http.get<Estatus[]>(this.apiUrl);
  }*/

   getEstatusDropdown(): Observable<DropdownOption[]> {
    return this.http.get<any[]>(environment.urlHost+'api/estatus').pipe(
      map(data => data.map(e => ({
        label: e.nombre,
        value: e.id.toString()
      })))
    );
  }


}