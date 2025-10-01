import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FibrasRoutingModule } from './fibras-routing.module';
import { AgendaRecomprasFibrasComponent } from './agenda-recompras-fibras/agenda-recompras-fibras.component';


@NgModule({
  declarations: [
    AgendaRecomprasFibrasComponent
  ],
  imports: [
    CommonModule,
    FibrasRoutingModule
  ]
})
export class FibrasModule { }
