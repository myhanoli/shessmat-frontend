import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth-service.service';
import { LoginService } from 'src/app/service/login.service';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: LoginService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let isActive: boolean = false;
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      //this.login("login");
      return isActive;
    }else{
      isActive = true;
    }

   /* const expectedRole: string[] = route.data.expectedRole;

    if(expectedRole.length > 0){
      const token = localStorage.getItem(environment.authTokenKey)?.toString();
      const tokenPayload:any = jwtDecode(token + '');
      expectedRole.forEach(expect =>{
        tokenPayload.authorities.forEach((role: string) => {
          if(expect === role){
            isActive = true;
          }
        });
      });
    }else {
      isActive = true;
    }*/
    return isActive;
  }

  getValidRole(expectedRole: string): boolean {
    let isActive: boolean = false;

    const token = localStorage.getItem(environment.authTokenKey)?.toString();
    const tokenPayload:any = jwtDecode(token + '');
    tokenPayload.authorities.forEach((role: string) => {
      if(expectedRole === role){
        isActive = true;
      }
    });

    return isActive;
  }

  /**
   * Open dialog from login
   */
  async login(path: any) {
    this.router.navigate([path]);
  }

}