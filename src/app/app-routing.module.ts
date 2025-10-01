import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './components/auth/guards/auth-guard';



@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'auth/login', pathMatch: 'full'},
            {
                path: 'layout', component: AppLayoutComponent,
                children: [
                    { path: 'login', loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule) },
                    { path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),
                    canActivate: [AuthGuard],
				
                     },
                    { path: 'uikit', loadChildren: () => import('./components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'documentation', loadChildren: () => import('./components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'pages', loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule) },
                    { path: 'administracion', loadChildren: () => import('./components/administracion/administracion.module').then(m => m.AdministracionModule)},
                    { path: 'operar-ofertas', loadChildren: () => import('./components/operar-ofertas/operar-ofertas.module').then(m => m.OperarOfertasModule)},
                    { path: 'proceso-inscripcion', loadChildren: () => import('./components/proceso-inscripcion/proceso-inscripcion.module').then(m => m.ProcesoInscripcionModule)},
                    { path: 'mantenimiento', loadChildren: () => import('./components/mantenimiento/mantenimiento.module').then(m => m.MantenimientoModule)},
                    { path: 'operacion-emisores', loadChildren: () => import('./components/operacion-emisores/operacion-emisores.module').then(m => m.OperacionEmisoresModule)},
                ]
            },
            { path: 'layout', loadChildren: () => import('./layout/app.layout.module').then(m => m.AppLayoutModule) },
            { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})


export class AppRoutingModule {
}
