import { UserService } from 'src/app/core/services/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private route: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    
    const islogged = this.userService.isLogged(); 

    if (route.url[0].path == 'profile' && route.url[1].path != 'me') {
      return true;
    }

    if (!islogged) {
      this.route.navigate(['/user/access/signin']);
    }

    return islogged;

    
  }
  
}
