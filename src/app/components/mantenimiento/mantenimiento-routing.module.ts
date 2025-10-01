import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambioEmisoraComponent } from './cambio-emisora/cambio-emisora.component';
import { CapitalesComponent } from './capitales/capitales.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { DeudaComponent } from './deuda/deuda.component';
import { OperarEstadoEmisoresComponent } from './operar-estado-emisores/operar-estado-emisores.component';

const routes: Routes = [
  { path: 'cambio-emisora', component: CambioEmisoraComponent },
  { path: 'capitales', component: CapitalesComponent },
  { path: '', component: MantenimientoComponent },
  { path: 'deuda', component: DeudaComponent },
  { path: 'operar-estado-emisores', component: OperarEstadoEmisoresComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MantenimientoRoutingModule { }
