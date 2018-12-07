import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewAnalyticsComponent } from './review-analytics.component';

const routes: Routes = [
  {
    path: '', component: ReviewAnalyticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewAnalyticsRoutingModule {
}