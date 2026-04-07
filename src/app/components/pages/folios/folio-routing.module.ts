import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FolioComponent } from './folio.component';


@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: FolioComponent }
  ])],
  exports: [RouterModule]
})
export class FolioRoutingModule { }
