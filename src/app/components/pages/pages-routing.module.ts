import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'crud', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
        { path: 'recepcion-equipo', loadChildren: () => import('./recepcion-equipo/recepcion-equipo.module').then(m => m.RecepcionEquipoModule) },
        { path: 'clientes', loadChildren: () => import('./clientes/cliente.module').then(m => m.ClienteModule) },
        { path: 'timeline', loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
