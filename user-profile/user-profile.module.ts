import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import {
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [UserProfileComponent]
})
export class UserProfileModule { }
