import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User, UserPrivileges } from '../types/User';
import { ApiService } from './api.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class UserService {

  user!: User;

  constructor(private api: ApiService) {
    this.loadOwnUser();
  }

  private loadOwnUser() {
    this.user = JSON.parse(window.atob(localStorage.getItem("user") as string)) as User;
  }

  private saveOwnUser() {
    localStorage.setItem(window.btoa(JSON.stringify(this.user)), "user");
  }

  signIn(userOrEmail: string, password: string) : Observable<User> {
    return this.api.request<User>('POST', '/api/user/signin', {
      userOrEmail, password
    }).pipe(tap(function (x: User): User {
      return x;
    }));
  }

  isAdmin() {
    return this.user?.privileges == UserPrivileges.ADMIN;
  }

  setAdmin() {
    this.user.privileges = UserPrivileges.ADMIN;
    this.saveOwnUser();
  }
}
