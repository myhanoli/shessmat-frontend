import { Injectable } from '@angular/core';
import { LoginRequest } from '../model/loginRequest';
import { JwtHelperService } from '@auth0/angular-jwt';
import  {  Observable, throwError, catchError, BehaviorSubject , tap, map} from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> =new BehaviorSubject<String>("");
    username: any;

    private user?:LoginRequest;

  constructor(private http: HttpClient) { }

  get currentUser():LoginRequest|undefined{
if(!this.user)return undefined;
return structuredClone(this.user);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    console.log("token: "+token)
    return !jwtHelper.isTokenExpired(token);
  }

  login(credentials:LoginRequest):Observable<any>{
    console.log("credentials2: " + credentials.username )
    return this.http.post<any>(environment.urlHost+"auth/login",credentials).pipe(
      
      tap( (userData) => {
        console.log(userData)
        localStorage.setItem("token", userData.token);
        localStorage.setItem("user", userData.user);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
      }),
      map((userData)=> userData.token),
      catchError(this.handleError)
    );
  } 

  logout():void{
    localStorage.removeItem("token");
    this.currentUserLoginOn.next(false);
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }

}
