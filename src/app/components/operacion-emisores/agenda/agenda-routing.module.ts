import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'capital', loadChildren: () => import('./capital/capital.module').then(m => m.CapitalModule)},
  { path: 'deuda', loadChildren: () => import('./deuda/deuda.module').then(m => m.DeudaModule)},
  { path: 'fibras', loadChildren: () => import('./fibras/fibras.module').then(m => m.FibrasModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule { }
