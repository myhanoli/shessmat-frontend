import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { EmpresasComponent } from './empresas/empresas.component';
import { AdministracionContenidosComponent } from './administracion-contenidos/administracion-contenidos.component';
import { ControlComponent } from './control/control.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { PublicarComponent } from './publicar/publicar.component';


@NgModule({
  declarations: [
    EmpresasComponent,
    AdministracionContenidosComponent,
    UsuariosComponent,
    ControlComponent,
    PublicarComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule
  ]
})
export class AdministracionModule { }
