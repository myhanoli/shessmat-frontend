import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrarPublicacionComponent } from './administrar-publicacion/administrar-publicacion.component';
import { AdministrarCuotasComponent } from './administrar-cuotas/administrar-cuotas.component';
import { ConsultarTramitesComponent } from './consultar-tramites/consultar-tramites.component';
import { ConsultaBitacoraComponent } from './consulta-bitacora/consulta-bitacora.component';

const routes: Routes = [
  { path: 'administrar-publicacion', component: AdministrarPublicacionComponent },
  { path: 'administrar-cuotas', component: AdministrarCuotasComponent },
  { path: 'consultar-tramites', component: ConsultarTramitesComponent },
  { path: 'consultar-bitacora', component: ConsultaBitacoraComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcesoInscripcionRoutingModule { }
