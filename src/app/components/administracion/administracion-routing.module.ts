import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresasComponent } from './empresas/empresas.component';
import { AdministracionContenidosComponent } from './administracion-contenidos/administracion-contenidos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ControlComponent } from './control/control.component';
import { PublicarComponent } from './publicar/publicar.component';

const routes: Routes = [
  { path: 'empresas', component: EmpresasComponent },
  { path: 'administracion-contenidos', component: AdministracionContenidosComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'control', component: ControlComponent },
  { path: 'publicar', component: PublicarComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
