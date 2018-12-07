import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';

import { ApiServiceService } from '../../api-service.service';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { SignupDirective } from './signup.directive';


@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FlashMessagesModule.forRoot()
  ],
  declarations: [SignupComponent, SignupDirective],
  providers: [ApiServiceService]
})
export class SignupModule { }
