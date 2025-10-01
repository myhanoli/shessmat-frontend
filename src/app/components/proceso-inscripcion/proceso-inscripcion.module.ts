import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcesoInscripcionRoutingModule } from './proceso-inscripcion-routing.module';
import { AdministrarCuotasComponent } from './administrar-cuotas/administrar-cuotas.component';
import { AdministrarPublicacionComponent } from './administrar-publicacion/administrar-publicacion.component';
import { ConsultaBitacoraComponent } from './consulta-bitacora/consulta-bitacora.component';
import { ConsultarTramitesComponent } from './consultar-tramites/consultar-tramites.component';


@NgModule({
  declarations: [
    AdministrarCuotasComponent,
    AdministrarPublicacionComponent,
    ConsultaBitacoraComponent,
    ConsultarTramitesComponent
  ],
  imports: [
    CommonModule,
    ProcesoInscripcionRoutingModule
  ]
})
export class ProcesoInscripcionModule { }
