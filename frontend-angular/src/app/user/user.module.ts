import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SigninComponent } from './signin.component';
import { SignupComponent } from './signup.component';


@NgModule({
  declarations: [
    UserComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
