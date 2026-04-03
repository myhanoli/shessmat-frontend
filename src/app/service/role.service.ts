import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor() { }

  /**
   * Obtiene los roles del usuario actual desde localStorage
   * @returns Array de roles o null si no hay usuario
   */
  getUserRoles(): string[] {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        return user.roles ? user.roles.map((role: string) => role.toLowerCase()) : [];
      }
    } catch (error) {
      console.error('Error al obtener roles del usuario:', error);
    }
    return [];
  }

  /**
   * Verifica si el usuario actual tiene un rol específico
   * @param role El rol a verificar (case-insensitive)
   * @returns true si el usuario tiene el rol, false en caso contrario
   */
  hasRole(role: string): boolean {
    const roles = this.getUserRoles();
    return roles.includes(role.toLowerCase());
  }

  /**
   * Verifica si el usuario tiene al menos uno de los roles especificados
   * @param roles Array de roles a verificar
   * @returns true si el usuario tiene al menos uno de los roles
   */
  hasAnyRole(roles: string[]): boolean {
    return roles.some(role => this.hasRole(role));
  }

  /**
   * Verifica si el usuario es admin
   * @returns true si el usuario tiene rol admin
   */
  isAdmin(): boolean {
    return this.hasRole('admin');
  }
}
