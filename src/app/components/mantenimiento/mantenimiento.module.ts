import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientoRoutingModule } from './mantenimiento-routing.module';
import { CambioEmisoraComponent } from './cambio-emisora/cambio-emisora.component';
import { CapitalesComponent } from './capitales/capitales.component';
import { DeudaComponent } from './deuda/deuda.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { OperarEstadoEmisoresComponent } from './operar-estado-emisores/operar-estado-emisores.component';


@NgModule({
  declarations: [
    CambioEmisoraComponent,
    CapitalesComponent,
    DeudaComponent,
    MantenimientoComponent,
    OperarEstadoEmisoresComponent
  ],
  imports: [
    CommonModule,
    MantenimientoRoutingModule
  ]
})
export class MantenimientoModule { }
