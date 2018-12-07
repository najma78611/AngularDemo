import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewAnalyticsComponent } from './review-analytics.component';
import { ReviewAnalyticsRoutingModule } from './review-analytics-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReviewAnalyticsRoutingModule
  ],
  declarations: [ReviewAnalyticsComponent]
})
export class ReviewAnalyticsModule { }
