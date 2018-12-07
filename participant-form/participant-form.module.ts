import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantFormComponent } from './participant-form.component';
import { ParticipantFormRoutingModule } from './participant-form-routing.module';
import {
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
  imports: [
    CommonModule,
    ParticipantFormRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPayPalModule
  ],
  declarations: [ParticipantFormComponent]
})
export class ParticipantFormModule { }
