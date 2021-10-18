import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SigninComponent } from './access/signin.component';
import { SignupComponent } from './access/signup.component';
import { LogoComponent } from './logo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AccessComponent } from './access/access.component';


@NgModule({
  declarations: [
    UserComponent,
    SigninComponent,
    SignupComponent,
    LogoComponent,
    AccessComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
