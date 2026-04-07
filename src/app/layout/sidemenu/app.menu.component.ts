import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../../service/app.layout.service';
import { RoleService } from '../../service/role.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService, private roleService: RoleService) { }

    ngOnInit() {
        // Construir items de Pages
        const soporteTecnicoItems = [
            {
                label: 'Recepcion de equipos',
                icon: 'pi pi-fw pi-arrow-right',
                routerLink: ['/layout/pages/recepcion-equipo']
            },
            {
                label: 'Servicios',
                icon: 'pi pi-fw pi-arrow-left',
                routerLink: ['/layout/pages/folios']
            }
        ];

        if (this.roleService.isAdmin()) {
            soporteTecnicoItems.push({
                label: 'Reportes de reparaciones',
                icon: 'pi pi-fw pi-file-excel',
                routerLink: ['/layout/reportes-reparaciones']
            });
        }

        const pagesItems = [
            {
                label: 'Soporte Tecnico',
                icon: 'pi pi-fw pi-wrench',
                items: soporteTecnicoItems
            },
            {
                label: 'Catalogos',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Clientes',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/layout/pages/clientes']
                    },
                    {
                        label: 'Marcas',
                        icon: 'pi pi-fw pi-tag'
                    },
                    {
                        label: 'Tipo de Equipo',
                        icon: 'pi pi-fw pi-minus-circle'
                    },
                    {
                        label: 'Servicios',
                        icon: 'pi pi-fw pi-file-edit'
                    }
                ]
            },
            {
                label: 'Mantenimiento',
                icon: 'pi pi-fw pi-user',
                items: []
            }
        ];

        // Agregar Administracion solo si el usuario es ADMIN
        if (this.roleService.isAdmin()) {
            pagesItems.push({
                label: 'Administracion',
                icon: 'pi pi-fw pi-cog',
                items: [
                    {
                        label: 'Usuarios',
                        icon: 'pi pi-fw pi-users',
                        routerLink: ['/layout/pages/crud']
                    }
                ]
            });
        }

        // Construir el modelo completo
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/layout/dashboard'] }
                ]
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: pagesItems
            }
        ];
    }

    /**
     * Verifica si el usuario actual tiene un rol específico
     * @param role El rol a verificar
     * @returns true si el usuario tiene el rol
     */
    hasRole(role: string): boolean {
        return this.roleService.hasRole(role);
    }
}
