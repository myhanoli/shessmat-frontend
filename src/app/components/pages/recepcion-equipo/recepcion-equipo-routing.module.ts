import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecepcionEquipoComponent } from './recepcion-equipo.component';


@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: RecepcionEquipoComponent }
	])],
	exports: [RouterModule]
})
export class RecepcionEquipoRoutingModule { }
