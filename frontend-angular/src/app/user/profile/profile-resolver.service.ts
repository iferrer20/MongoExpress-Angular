import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/types/User';

@Injectable()
export class ProfileResolver implements Resolve<User> {

  constructor(
    private userService: UserService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let { id } = route.params;
    if (id == 'me') {
      if (!this.userService.user) {
        return of(null);
      }

      id = '@' + this.userService.user?.username;
    }

    return this.userService.getUser(id).pipe(
      catchError((e) => { 
        if (e.message == 'Not found') {
          return of(null);
        } else {
          throw e;
        }
      })
    );
  }
}
