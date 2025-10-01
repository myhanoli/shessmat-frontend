import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaTenedoresComponent } from './agenda-tenedores/agenda-tenedores.component';

const routes: Routes = [
  { path: 'agenda-tenedores', component: AgendaTenedoresComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeudaRoutingModule { }
