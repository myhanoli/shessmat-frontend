import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportesReparacionesComponent } from './reportes-reparaciones.component';

const routes: Routes = [
  { path: '', component: ReportesReparacionesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesReparacionesRoutingModule { }
