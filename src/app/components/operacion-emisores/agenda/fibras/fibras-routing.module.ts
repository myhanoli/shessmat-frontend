import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaRecomprasFibrasComponent } from './agenda-recompras-fibras/agenda-recompras-fibras.component';

const routes: Routes = [
  { path: 'agenda-recompras-fibras', component: AgendaRecomprasFibrasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FibrasRoutingModule { }
