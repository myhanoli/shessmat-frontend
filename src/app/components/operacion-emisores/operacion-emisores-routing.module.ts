import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'agenda', loadChildren: () => import('./agenda/agenda.module').then(m => m.AgendaModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperacionEmisoresRoutingModule { }
