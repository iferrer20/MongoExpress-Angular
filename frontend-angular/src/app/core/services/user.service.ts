import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User, UserPrivileges } from '../types/User';
import { ApiService } from './api.service';
import { first, tap } from 'rxjs/operators';

@Injectable()
export class UserService {

  user!: User;

  constructor(private api: ApiService) {
    this.loadOwnUser();
  }

  private loadOwnUser() {
    try {
      this.user = JSON.parse(window.atob(localStorage.getItem("user") as string)) as User;
    } catch (e) {}
  }

  private saveOwnUser() {
    localStorage.setItem(window.btoa(JSON.stringify(this.user)), "user");
  }

  signIn(username: string, password: string) : Observable<User> {
    return this.api.request<User>('POST', '/user/signin', {
      username, password
    }).pipe(
      first(),
      tap((user: User) => {
        this.user = user;
        return user;
      }
    ));
  }
  signUp(email: string, username: string, password: string) : Observable<User> {
    return this.api.request<User>('POST', '/user/signup', {
      email, username, password
    }).pipe(
      first(),
      tap((user: User) => {
        this.user = user;
        return user;
      }
    ));
  }

  isAdmin() {
    return this.user?.privileges == UserPrivileges.ADMIN;
  }

  setAdmin() {
    this.user.privileges = UserPrivileges.ADMIN;
    this.saveOwnUser();
  }
}
