import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../../service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
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
                items: [
                    {
                        label: 'Soporte Tecnico',
                        icon: 'pi pi-fw pi-wrench',
                        items: [
                            {
                                label: 'Recepcion de equipos',
                                icon: 'pi pi-fw pi-arrow-right',
                               // routerLink: ['/auth/login']
                               routerLink: ['/layout/pages/recepcion-equipo']
                            },
                            {
                                label: 'Entrega de equipos',
                                icon: 'pi pi-fw pi-arrow-left',
                              //  routerLink: ['/auth/error']
                            },
                            

                        ]
                    },{
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
                                icon: 'pi pi-fw pi-tag',
                               // routerLink: ['/auth/error']
                            },
                            {
                                label: 'Tipo de Equipo',
                                icon: 'pi pi-fw pi-minus-circle',
                               // routerLink: ['/auth/error']
                            },
                            {
                                label: 'Servicios',
                                icon: 'pi pi-fw pi-file-edit',
                               // routerLink: ['/auth/error']
                            }

                        ]
                    },
                    {
                        label: 'Mantenimiento',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            
                            
                        ]
                    },
                    {
                        label: 'Administracion',
                        icon: 'pi pi-fw pi-cog',
                        items: [
                            {
                                label: 'Usuarios',
                                icon: 'pi pi-fw pi-users',
                                routerLink: ['/layout/pages/crud']
                            },
                            /*{
                                label: 'Historicas',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/uikit/charts']
                            },
                            {
                                label: 'Cambio de posicion',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/pages/timeline']
                            }*/
                        ]
                    }
                ]
            },
           
        ];
    }
}
