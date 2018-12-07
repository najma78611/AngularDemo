import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParticipantFormComponent } from './participant-form.component';

const routes: Routes = [
  {
    path: '', component: ParticipantFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParticipantFormRoutingModule {
}