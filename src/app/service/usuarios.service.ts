import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Cliente } from '../model/cliente';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
 
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

    getUsers(): Observable<Cliente[]> {
    return this.http.get(environment.urlHost+"api/listUser").pipe(
      map(response => response as Cliente[])
    );

  }

  saveUser(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(
      environment.urlHost + 'api/saveUser',
      cliente,
      { headers: this.httpHeaders }
    );
  }

  deleteUser(id:string):Observable<Cliente>{
    return this.http.delete<Cliente>(environment.urlHost+'api/deleteUser/'+id,{headers:this.httpHeaders})
  }

  
  updateUser(cliente:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(environment.urlHost+'api/updateUser/'+cliente.id,cliente,{headers:this.httpHeaders})
  }

  
}
