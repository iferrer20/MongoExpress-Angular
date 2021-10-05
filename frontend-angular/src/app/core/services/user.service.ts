import { Injectable } from '@angular/core';
import { User, UserPrivileges } from '../types/User';

@Injectable()
export class UserService {

  user!: User;

  constructor() {
    this.loadOwnUser();
  }

  private loadOwnUser() {
    this.user = JSON.parse(window.atob(localStorage.getItem("user") as string)) as User;
  }
  private saveOwnUser() {
    localStorage.setItem(window.btoa(JSON.stringify(this.user)), "user");
  }

  isAdmin() {
    return this.user?.privileges == UserPrivileges.ADMIN;
  }

  setAdmin() {
    this.user.privileges = UserPrivileges.ADMIN;
    this.saveOwnUser();
  }
}
