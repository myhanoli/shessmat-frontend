import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeudaRoutingModule } from './deuda-routing.module';
import { AgendaTenedoresComponent } from './agenda-tenedores/agenda-tenedores.component';


@NgModule({
  declarations: [
    AgendaTenedoresComponent
  ],
  imports: [
    CommonModule,
    DeudaRoutingModule
  ]
})
export class DeudaModule { }
