import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth-service.service';
import { LoginService } from 'src/app/service/login.service';
import { RoleService } from 'src/app/service/role.service';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: LoginService,
    private router: Router,
    private roleService: RoleService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let isActive: boolean = false;
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return isActive;
    } else {
      isActive = true;
    }

    // Verificar roles si se especifican en route.data.expectedRole
    const expectedRoles: string[] = route.data['expectedRole'];
    if (expectedRoles && expectedRoles.length > 0) {
      const hasValidRole = this.roleService.hasAnyRole(expectedRoles);
      if (!hasValidRole) {
        this.router.navigate(['/auth/access']);
        return false;
      }
    }

    return isActive;
  }

  /**
   * Verifica si el usuario tiene un rol específico
   * @param role El rol a verificar
   * @returns true si el usuario tiene el rol
   */
  hasRole(role: string): boolean {
    return this.roleService.hasRole(role);
  }

  /**
   * Verifica si el usuario es admin
   * @returns true si el usuario tiene rol admin
   */
  isAdmin(): boolean {
    return this.roleService.isAdmin();
  }
}