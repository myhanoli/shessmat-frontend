import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { RoleService } from 'src/app/service/role.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private auth: LoginService,
    private router: Router,
    private roleService: RoleService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    const routeData = route.pathFromRoot.reduce(
      (data, snapshot) => ({ ...data, ...snapshot.data }),
      {} as Record<string, unknown>
    );

    // Verificar roles requeridos o prohibidos en la ruta y sus padres.
    const expectedRoles = routeData['expectedRole'] as string[] | undefined;
    if (expectedRoles?.length) {
      const hasValidRole = this.roleService.hasAnyRole(expectedRoles);
      if (!hasValidRole) {
        this.router.navigate(['/auth/access']);
        return false;
      }
    }

    const forbiddenRoles = routeData['forbiddenRoles'] as string[] | undefined;
    if (forbiddenRoles?.some(role => this.roleService.hasRole(role))) {
      this.router.navigate(['/auth/access']);
      return false;
    }

    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot): boolean {
    return this.canActivate(route);
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