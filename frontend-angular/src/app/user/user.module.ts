import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SigninComponent } from './access/signin.component';
import { SignupComponent } from './access/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AccessComponent } from './access/access.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { ProfileResolver } from './profile/profile-resolver.service';


@NgModule({
  declarations: [
    UserComponent,
    SigninComponent,
    SignupComponent,
    AccessComponent,
    ProfileComponent
  ],
  providers: [
    ProfileResolver
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
