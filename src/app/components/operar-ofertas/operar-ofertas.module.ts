import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperarOfertasRoutingModule } from './operar-ofertas-routing.module';
import { ConsultasComponent } from './consultas/consultas.component';


@NgModule({
  declarations: [
    ConsultasComponent
  ],
  imports: [
    CommonModule,
    OperarOfertasRoutingModule
  ]
})
export class OperarOfertasModule { }
