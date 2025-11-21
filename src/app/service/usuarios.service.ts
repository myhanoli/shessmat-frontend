import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Cliente } from '../model/cliente';
import { Product, Role } from '../model/product';
import { Folio } from '../interface/Folio';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
 
  rol: Role = Role.ADMIN;
  
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8080/'
   // 'Access-Control-Allow-Origin': 'https://shessmat-backend-production.up.railway.app/'
    })

  constructor(private http: HttpClient) { }

    getUsers(): Observable<Cliente[]> {
    /*return this.http.get(environment.urlHost+"auth/login").pipe(
      map(response => response as Cliente[])
    );*/

    return this.http.get(environment.urlHost+"api/listUser").pipe(
      map(response => response as Cliente[])
    );

  }

  saveUser(cliente:Cliente):Observable<Cliente>{
    console.log('object cliente: ' + cliente.nombre)
  //  cliente.password = "123456"
    console.log('pasword: ' + cliente.password)
     
    cliente.rol = this.rol;
    //console.log('Rol: ' + cliente.rol)
    return this.http.post<Cliente>(environment.urlHost+'api/saveUser',cliente,{headers:this.httpHeaders})
  }

  deleteUser(id:string):Observable<Cliente>{
    return this.http.delete<Cliente>(environment.urlHost+'api/deleteUser/'+id,{headers:this.httpHeaders})
  }

  /*getCliente(id:number): Observable<Cliente> {
    return this.http.get<Cliente>('api/idCliente/'+id,{headers:this.httpHeaders})
  }*/

  updateUser(cliente:Cliente):Observable<Cliente>{
    console.log('Rol1: ' + this.rol)
    return this.http.put<Cliente>(environment.urlHost+'api/updateUser/'+cliente.id,cliente,{headers:this.httpHeaders})
  }

  
}
