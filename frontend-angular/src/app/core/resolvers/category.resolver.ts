import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../types/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryResolver implements Resolve<Category[]> {
  constructor(
    private categoryService: CategoryService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Category[]> {

    if (!this.categoryService.categories) {
      return this.categoryService
        .list();
    } else {
       return of(this.categoryService.categories);
    }
    
  }
}
