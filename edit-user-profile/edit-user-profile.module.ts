import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUserProfileRoutingModule } from './edit-user-profile-routing.module';
import { EditUserProfileComponent } from './edit-user-profile.component';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    EditUserProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [EditUserProfileComponent]
})
export class EditUserProfileModule { }
