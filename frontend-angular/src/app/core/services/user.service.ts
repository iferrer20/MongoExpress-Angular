import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User, UserPrivileges } from '../types/User';
import { ApiService } from './api.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class UserService {

  _user!: User;
  errno!: string;

  constructor(private api: ApiService) {
    this.loadOwnUser();
  }

  get user() {
    return this._user;
  }
  set user(value) {
    this._user = value;
    this.saveOwnUser();
  }

  private loadOwnUser() {
    try {
      this._user = JSON.parse(window.atob(localStorage.getItem("user") as string)) as User;
    } catch (e) {}
  }

  private saveOwnUser() {
    localStorage.setItem("user", window.btoa(JSON.stringify(this._user)));
  }

  signIn(username: string, password: string) : Observable<User> {
    return this.api.request<User>('POST', 'user/signin', {
      username, password
    }).pipe(
      tap(
        (u: User) => this.user = u,
        (err: Error) => this.errno = err.message
      ),
    );
  }
  signUp(email: string, username: string, password: string) : Observable<User> {
    return this.api.request<User>('POST', 'user/signup', {
      email, username, password
    }).pipe(
      tap(
        (u: User) => this.user = u,
        (err: string) => this.errno = err
      ),
    );
  }
  isAdmin() {
    return this.user?.privileges == UserPrivileges.ADMIN;
  }

  setAdmin() {
    this.user.privileges = UserPrivileges.ADMIN;
    this.saveOwnUser();
  }
}
