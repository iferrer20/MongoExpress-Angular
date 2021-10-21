import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { SignupComponent } from './access/signup.component';
import { SigninComponent } from './access/signin.component';
import { AccessComponent } from './access/access.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: UserComponent },
  {
    path: 'access',
    component: AccessComponent,
    children: [
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent }
    ]
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
