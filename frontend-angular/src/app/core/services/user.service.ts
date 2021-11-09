import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User, UserPrivileges } from '../types/User';
import { ApiService } from './api.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class UserService {

  private _user: User | null = null;
  errno!: string;

  constructor(private api: ApiService) {
    this.loadOwnUser();
  }

  get user() {
    return this._user;
  }
  set user(value: User | null) {
    this._user = value;
    this.saveOwnUser();
  }

  private loadOwnUser() {
    try {
      this._user = JSON.parse(window.atob(localStorage.getItem('user') as string)) as User;
    } catch (e) { }
  }

  private saveOwnUser() {
    if (this._user) {
      localStorage.setItem('user', window.btoa(JSON.stringify(this._user)));
    } else {
      localStorage.removeItem('user');
    }
  }

  signIn(username: string, password: string): Observable<User> {
    return this.api.request<User>('POST', 'user/signin', {
      username, password
    }).pipe(
      tap(
        (u: User) => this.user = u,
        (err: Error) => this.errno = err.message
      ),
    );
  }
  signUp(email: string, username: string, password: string): Observable<User> {
    return this.api.request<User>('POST', 'user/signup', {
      email, username, password
    }).pipe(
      tap(
        (u: User) => this.user = u,
        (err: string) => this.errno = err
      ),
    );
  }

  signOut() {
    return this.api.request<User>('POST', 'user/signout')
    .pipe(
      tap(
        (u: User) => this.user = null,
        (err: string) => this.errno = err
      ),
    );
  }

  isAdmin() {
    return this.user?.privileges == UserPrivileges.ADMIN;
  }

  setAdmin() {
    if (!this.user) { return; }
    this.user.privileges = UserPrivileges.ADMIN;
    this.saveOwnUser();
  }

  follow(_id: string) {
    return this.api.request('POST', 'user/follow', { _id });
  }

  getUser(username: string) {
    return this.api.request<User>('GET', 'user/' + username);
  }

  changeProfile(img: File) {
    const formData = new FormData();
    console.log(img)
    formData.append("pfp", img, img.name);
    return this.api.request('POST', 'user/mypfp', formData);
  }

  isLogged() {
    return !!this.user;
  }

}
