import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaRecomprasComponent } from './agenda-recompras/agenda-recompras.component';
import { CapitalComponent } from './capital.component';

const routes: Routes = [
  { path:'', component: CapitalComponent },
  { path: 'agenda-recompras', component: AgendaRecomprasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapitalRoutingModule { }
