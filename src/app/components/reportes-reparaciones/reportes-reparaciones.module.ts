import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ReportesReparacionesRoutingModule } from './reportes-reparaciones-routing.module';
import { ReportesReparacionesComponent } from './reportes-reparaciones.component';

@NgModule({
  declarations: [ReportesReparacionesComponent],
  imports: [CommonModule, ReactiveFormsModule, ReportesReparacionesRoutingModule]
})
export class ReportesReparacionesModule { }
