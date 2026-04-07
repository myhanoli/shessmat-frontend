import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

import { Product, Role } from '../model/product';
import { Folio } from '../interface/Folio';

import { Cliente2 } from 'src/app/interface/cliente2';




@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    //'Access-Control-Allow-Origin': 'http://localhost:8080/'
    'Access-Control-Allow-Origin': 'environment.urlHost'
    })

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente2[]> {
    return this.http.get(environment.urlHost+'api/lista').pipe(
      map(response => response as Cliente2[])
    );
  }

  creaCliente(cliente:Cliente2):Observable<Cliente2>{
   // Asegurar formato correcto de fecha
  if (cliente.fechaAlta instanceof Date) {
    cliente.fechaAlta = cliente.fechaAlta.toISOString().split('T')[0];
  } else if (typeof cliente.fechaAlta === 'string' && cliente.fechaAlta.includes('T')) {
    cliente.fechaAlta = cliente.fechaAlta.split('T')[0];
  }

    console.log('Recibe cliente con apellido parterno ' + cliente.apellidoMat)
    console.log('Se recibe cliente con id ' + cliente.id)
    return this.http.post<Cliente2>(environment.urlHost+'api/guardar',cliente,{headers:this.httpHeaders})
  }

  borraCliente(id:number):Observable<Cliente2>{
    return this.http.delete<Cliente2>(environment.urlHost+'api/eliminar/'+id,{headers:this.httpHeaders})
  }

  getCliente(id:number): Observable<Cliente2> {
    return this.http.get<Cliente2>(environment.urlHost+'api/idCliente/'+id,{headers:this.httpHeaders})
  }

  updateCliente(cliente:Cliente2):Observable<Cliente2>{

    // Asegurar formato correcto de fecha
  if (cliente.fechaAlta instanceof Date) {
    cliente.fechaAlta = cliente.fechaAlta.toISOString().split('T')[0];
  } else if (typeof cliente.fechaAlta === 'string' && cliente.fechaAlta.includes('T')) {
    cliente.fechaAlta = cliente.fechaAlta.split('T')[0];
  }
    console.log('Recibe cliente con fechaAlta ' + cliente.fechaAlta)
    return this.http.put<Cliente2>(environment.urlHost+'api/actualizar/'+cliente.id,cliente,{headers:this.httpHeaders})

  }
  
getEndNumCliente(): Observable<string> {
  return this.http.get(environment.urlHost + 'api/ultimo-numero', { responseType: 'text' as const });
}

}
