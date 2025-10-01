import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapitalRoutingModule } from './capital-routing.module';
import { AgendaRecomprasComponent } from './agenda-recompras/agenda-recompras.component';
import { CapitalComponent } from './capital.component';


@NgModule({
  declarations: [
    AgendaRecomprasComponent,
    CapitalComponent
  ],
  imports: [
    CommonModule,
    CapitalRoutingModule
  ]
})
export class CapitalModule { }
