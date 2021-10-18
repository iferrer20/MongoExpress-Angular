import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { SignupComponent } from './access/signup.component';
import { SigninComponent } from './access/signin.component';
import { AccessComponent } from './access/access.component';

const routes: Routes = [
  { path: '', component: UserComponent },
  {
    path: 'access',
    component: AccessComponent,
    children: [
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
